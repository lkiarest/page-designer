/**
 * 组件类型工厂，根据 type 返回已注册组件的类型定义
 */
import IElement, { ElementContructor } from './element/IElement'
import NullElement from './element/NullElement'
import ElementOption from './ElementOption'
import { genKey } from './utils'

class ElementFactory {
  _elements: Map<string, ElementContructor> = new Map()

  registerElement(elemType: ElementContructor | Array<ElementContructor>): void {
    if (Array.isArray(elemType)) { // 批量注册
      elemType.forEach(item => {
        this.registerElement(item)
      })
    } else {
      this._elements.set(elemType.type, elemType)
    }
  }

  createElement(option: ElementOption, parent?: IElement): IElement {
    const Ctor = this._elements.get(option.type)

    if (!Ctor) {
      console.warn('invalid element type ' + option.type)
      return new NullElement()
    }

    if (!option.key) {
      option.key = genKey()
    }

    const element = new Ctor(option)
    element.parent = parent

    if (option.children && option.children.length > 0) {
      element.children = option.children.map(child => this.createElement(child, element))
    }

    return element
  }
}

export default new ElementFactory()
