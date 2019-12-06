import React, { ReactElement } from 'react'
import ElementOption from '../ElementOption'
import { RenderOption } from './IElement'
import IElement, { ElementContructor } from './IElement'
import { JsonFormat, RECT } from '../../types'
import { genKey } from '../utils'

export default class NullElement implements IElement {
  dirty?: boolean | undefined
  value?: any
  name?: string | undefined
  props?: any
  children?: IElement[] | undefined
  parent?: IElement | null | undefined
  public static icon: string = 'null'
  public static displayName: string = '空元素'

  type = 'null'
  key = genKey()
  propsData = new Map()

  render(renderOption?: RenderOption | undefined) {
    return <div className="null-element" key={this.key}></div>
  }

  canDrag(): boolean {
    throw new Error("Method not implemented.")
  }
  canBeDroped(): boolean {
    throw new Error("Method not implemented.")
  }
  canDropTo(element: IElement): boolean {
    throw new Error("Method not implemented.")
  }
  canRemove(): boolean {
    throw new Error("Method not implemented.")
  }
  renderBefore(props: any, renderOption?: RenderOption | undefined): React.ReactElement | null {
    throw new Error("Method not implemented.")
  }
  renderAfter(props: any, renderOption?: RenderOption | undefined): React.ReactElement | null {
    throw new Error("Method not implemented.")
  }
  getClientRect(): RECT {
    throw new Error("Method not implemented.")
  }
  getRenderedDom() {
    return undefined
  }
  jsonData(): JsonFormat {
    throw new Error("Method not implemented.")
  }

  defaultProps() {
    return []
  }
  prepareProps(props: any) {
    return props
  }
  getComponent(): typeof React.Component | React.FunctionComponent<{}> {
    throw new Error("Method not implemented.")
  }
  isInline() {
    return true
  }

  _render(options: ElementOption): ReactElement {
    throw new Error("Method not implemented.")
  }

  ctor() {
    return this.constructor as ElementContructor
  }

  getPropType(name: string): string {
    throw new Error("Method not implemented.")
  }
}
