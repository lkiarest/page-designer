import { observable, action, IObservableArray, computed, autorun } from 'mobx'
import ElementOption from '../core/ElementOption'
import rawOptions from '../mock.json'
import NullElement from '../core/element/NullElement'
import factory from '../core/ElementFactory'
import { ROOT_PAGE, PROP_NAME_PREFIX } from '../configs'
import IElement from '../core/element/IElement'
import { parseValue, triggerLayoutChange/* , willReflow */ } from '../core/utils'
import Records from './Records'
// import { ChangeEvent } from 'react'
import { ValueDataType, DropPlace } from '../types'
import PageElement from '../core/element/PageElement'

const ensureArray = <T>(arr: T | Array<T>): Array<T> => Array.isArray(arr) ? arr : [arr]

// 构建组件树
const makeElementTree = (options: Array<ElementOption>, dataValue: ValueDataType, parent?: IElement): Array<IElement> => {
  return options.map(item => {
    const elem = factory.createElement(item, parent)

    if (item.children && item.children.length > 0) {
      elem.children = makeElementTree(item.children, dataValue, elem)
    }

    return elem
  })
}

// 在树结构中查找控件并进行自定义处理
type CallbackFunc = (item: IElement, index: number, list: Array<IElement>, parent?: IElement) => void

// 查找控件并做指定的处理
const findAndHandleElement = (elementKey: string, list: Array<IElement>, callback: CallbackFunc, parent?: IElement) => {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    if (item.key === elementKey) {
      callback && callback(item, i, list, parent)
      return true
    } else {
      if (findAndHandleElement(elementKey, item!.children || [], callback, item)) {
        return true
      }
    }
  }

  return false
}

// 收集所有校验规则
const findAllRules = (list: Array<IElement>, result:{[key: string]: any} = {}) => {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    if (item.name && item.rules &&  item.rules.length > 0) {
      result[item.name] = item.rules
    }

    if (item.children) {
      findAllRules(item.children, result)
    }
  }

  return result
}

const nullElement = new NullElement()
const rootElement = new PageElement(new ElementOption({
  type: 'page',
  key: ROOT_PAGE,
}))

const propsCache:Map<string, ElementOption | Array<ElementOption>> = new Map()

export class Store {
  /**
   * 所有节点定义
   */
  @observable elements: IObservableArray<IElement> = observable([])
  @observable selectedElement: IElement = rootElement
  @observable hoverElement?: IElement = nullElement
  @observable hoverPlace: string = ''
  @observable valueData: ValueDataType = new Map()
  @observable canUndo: boolean = false
  @observable canRedo: boolean = false
  @observable placeholder: DropPlace | null = null
  @observable rootElement: IElement = rootElement

  records = new Records<Object>()

  constructor() {
    autorun(() => {
      this.records.add(this.jsonData)

      this.canUndo = this.records.hasPrev()
      this.canRedo = this.records.hasNext()

      triggerLayoutChange(120) // wait for animating
    }, {
      delay: 100
    })
  }

  @computed get validateRules(): {[key: string]: any} {
    return findAllRules(this.elements)
  }

  @computed get selectedProps(): Array<ElementOption> {
    const  { selectedElement } = this
    if (!selectedElement) {
      return []
    }

    const defaultProps = selectedElement.defaultProps()
    if (!defaultProps) {
      return []
    }

    const elementKey = selectedElement.key
    if (propsCache.has(elementKey)) {
      return propsCache.get(elementKey) as ElementOption[]
    } else {
      const propsValue = selectedElement.props || {}

      propsCache.set(elementKey, defaultProps.map(item => {
        const key = `${elementKey}_prop_${item.name}`

        if (!propsCache.has(key)) {
          const option = new ElementOption({
            type: 'input',
            name: item.name,
            key: key,
            props: {}
          })

          propsCache.set(key, option)
        }

        const cached = propsCache.get(key) as ElementOption
        Object.assign(cached.props, {
          name: item.name,
          ...(item.props || {}),
          value: item.name ? propsValue[item.name] : item.default
        })

        return cached
      }))
    }

    return propsCache.get(elementKey) as ElementOption[]
  }

  // 控件列表的 json 表示
  @computed get jsonData() {
    return (this.elements || []).map((item: IElement) => item.jsonData())
  }

  @action undo() {
    const val = this.records.prev()
    if (val) {
      this.loadElements(val)
    }
  }

  @action redo() {
    const val = this.records.next()
    if (val) {
      this.loadElements(val)
    }
  }

  // 加载配置并创建组件
  @action loadElements(rawJson?: any) {
    const options = ensureArray<ElementOption>(ElementOption.loadOptions(rawJson || rawOptions))
    this.elements.replace(makeElementTree(options, this.valueData))
    this.rootElement.children = this.elements
    this.elements.map(item => item.parent = this.rootElement)

    this.reselectElement()
  }

  // 列表发生变化后重新选中元素
  reselectElement() {
    if (this.selectedElement !== nullElement) {
      if (!findAndHandleElement(this.selectedElement.key, this.elements, (item) => {
        this.selectElement(item)
      }, this.rootElement)) {
        this.selectElement(rootElement)
      }
    }
  }

  // 当前设计器中选择元素
  @action selectElement(element: IElement) {
    this.selectedElement = element
  }

  // 移除元素
  @action removeElement(element: IElement) {
    const removeKey = element.key
    findAndHandleElement(removeKey, this.elements, (item: IElement, index, list) => {
      list.splice(index, 1)

      if(removeKey === this.selectedElement.key) {
        this.selectElement(rootElement)
      }
    }, this.rootElement)
  }

  @action cloneElement(element: IElement) {
    console.log('clone it')
  }

  @action clearHover() {
    this.setPlaceHolder(null)
  }

  // 移动控件位置
  @action moveElement(source: IElement, dropPlace: DropPlace) {
    const { container, index } = dropPlace

    if (container && source) {
      const len = container.children ? container.children.length : 0
      if (container.children && index < len && container.children[index].key === source.key) {
        return
      }

      // 记录待删除的位置，添加之后进行删除操作
      let listToDelete: Array<IElement> = []

      findAndHandleElement(source.key, this.elements, (_, pos, list, parent) => {
        // find same place to remove and insert
        // list.splice(pos, 1)
        listToDelete = list
        list[pos] = nullElement
      }, this.rootElement)

      if (! container.children) {
        container.children = []
      }

      source.parent = container
      container.children.splice(index, 0, source)

      if (listToDelete) {
        listToDelete.forEach((item, index) => {
          if (item.type === 'null') {
            listToDelete.splice(index, 1)
          }
        })
      }
    }
  }

  @action handleModelChange(e: any) {
    const { selectedElement } = this
    selectedElement.name = e.name
    selectedElement.dataType = e.dataType
    selectedElement.rules = e.rules
  }

  @action handleStyleChange(e: any) {
    const { selectedElement } = this
    if (!selectedElement) {
      return
    }

    if (!selectedElement.props) {
      selectedElement.props = {}
    }

    selectedElement.props.style = e
  }

  /**
   * 控件属性面板
   */
  @action handleFormChangeEvent(e: any, name: string) {
    console.debug('handleFormChangeEvent', e, name, e.target ? e.target.value : e)
    const { selectedElement } = this
    if (!selectedElement || !name) {
      return
    }

    if (!selectedElement.props) {
      selectedElement.props = {}
    }

    const value = e.target ? e.target.value : e

    if (name.startsWith(PROP_NAME_PREFIX)) {
      name = name.replace(PROP_NAME_PREFIX, '')
      selectedElement.props = {
        ...selectedElement.props,
        [name]: parseValue(value, selectedElement.getPropType(name))
      }
    } else {
      
    }
  }

  // 设置插入占位符
  @action setPlaceHolder(placeholder: DropPlace | null) {
    this.placeholder = placeholder
  }
}
