import React, { SFC } from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { JsonFormat, CommonPropType, StaticPropsType, RECT, RuleItem, ModelType } from '../../types'
import ElementOption from '../ElementOption'
import ElementCategory from './ElementCategory'
import factory from '../ElementFactory'
import IElement, { RenderOption, ElementContructor } from './IElement'
import { getItem } from './RenderCache'
import eventBus from '../utils/eventBus'
// import { triggerLayoutChange } from '../utils/index'
import { EventEmitter } from 'events'

export default abstract class Element implements IElement {
  private componentCtor: typeof React.Component | SFC | null = null
  private propsCache: Map<string, CommonPropType> = new Map()
  public eventBus: EventEmitter = eventBus

  @observable public key: string
  @observable public value?: any
  @observable public name?: string
  @observable public dataType?: ModelType
  @observable public children?: Array<IElement>
  @observable public parent?: IElement | null
  @observable public props?: CommonPropType
  @observable public rules?: Array<RuleItem>

  static category: ElementCategory = ElementCategory.BASIC
  static icon: string = 'file'
  static displayName: string = ''
  static type:string = ''
  /**
   * 控件默认的属性列表（包含默认值）
   */
  static props: StaticPropsType = []

  constructor(option: ElementOption) {
    this.key = option.key || ''
    // this.type = this.ctor().type
    this.name = option.name
    this.dataType = option.dataType
    this.rules = option.rules || []

    this.children = option.children && option.children.map(item => factory.createElement(item, this))
    this.parent = null

    const defaultProps = this.defaultProps()
    const defaultPropVals: {[key: string]: any} = {}

    if (defaultProps && defaultProps.length > 0) {
      defaultProps.forEach(item => {
        if (item && item.name) {
          item.name && this.propsCache.set(item.name, item)
          defaultPropVals[item.name] = item.default
        }
      })
    }

    this.props = Object.assign({}, defaultPropVals, option.props)
  }

  get type() {
    return this.ctor().type
  }

  // 转为 json 表示格式
  jsonData(): JsonFormat {
    const ret: JsonFormat = {
      key: this.key,
      type: this.type,
      props: this.props,
      name: this.name,
      rules: this.rules,
      dataType: this.dataType,
    }

    if (this.children) {
      ret.children = this.children.map(item => item.jsonData())
    }

    return JSON.parse(JSON.stringify(ret))
  }

  // 是否允许拖动
  canDrag(): boolean {
    return true
  }

  // 是否允许将其拖入其他控件
  canDropTo(target: IElement): boolean {
    return true
  }

  // 是否允许将其他控件拖入
  canBeDroped(target?: IElement): boolean {
    return false
  }

  // 是否允许删除此控件
  canRemove(): boolean {
    return true
  }

  // 在 _render 元素之前渲染的东东
  renderBefore(props: any, renderOption?: RenderOption): React.ReactElement | null {
    return null
  }

  // 在 _render 元素之后渲染的东东
  renderAfter(props: any, renderOption?: RenderOption): React.ReactElement | null {
    return null
  }

  // render 之前对 props 进行预处理
  prepareProps(props: any): any {
    return props
  }

  // 获取渲染控件
  abstract _getComponent(): typeof React.Component | SFC<any>

  getComponent(): typeof React.Component | SFC {
    if (!this.componentCtor) {
      this.componentCtor = this._getComponent()
    }

    return this.componentCtor
  }

  // 获取控件所属类的定义
  ctor(): ElementContructor {
    return this.constructor as ElementContructor
  }

  /**
   * 是否为行内元素
   */
  isInline(): boolean {
    return !!this.ctor().inline
  }

  get shouldCheckDataType(): boolean {
    return !!this.ctor().checkDataType
  }

  // 获取控件的默认属性值
  defaultProps(): StaticPropsType {
    // console.log('defaultProps', this.ctor().props)
    return this.ctor().props || []
  }

  // 获取属性类型
  getPropType(name: string): string {
    const prop = this.propsCache.get(name)
    return (prop && prop.dataType) || 'string'
  }

  // get real rendered dom element
  getRenderedDom(): HTMLElement | undefined {
    const component = getItem(this.key)
    if (component) {
      const domNode = ReactDOM.findDOMNode(component.current) as HTMLElement
      return domNode
    }
  }

  getClientRect() {
    const dom = this.getRenderedDom()
    if (dom) {
      return dom.getBoundingClientRect() as RECT
    }

    return {x: 0, y: 0}
  }
}
