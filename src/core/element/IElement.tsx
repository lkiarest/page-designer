import React, { SFC } from 'react'
import ElementOption from '../ElementOption'
import ElementCategory from './ElementCategory'
import { JsonFormat, RECT, StaticPropsType } from '../../types'

export type RenderOption = {
  withBox?: boolean, // 是否包含外框，用于 render 方法
  withLabel?: boolean, // 是否包含标签，用于 _render 方法
  index?: number, // 索引，拖动排序用
  element?: IElement // 当前绑定的元素
  props?:any // 额外附加属性
}

export interface ElementContructor {
  new(option: ElementOption): IElement
  type: string
  category: ElementCategory
  icon: string
  displayName: string
  checkDataType?: boolean,
  inline?:boolean // 是否为行内元素
  props?: any
}

export default interface IElement {
  type: string
  key: string
  value?: any
  name?:string
  props?: any
  dataType?: string // 允许绑定的数据类型
  children?: Array<IElement>
  parent?: IElement | null // 父容器
  dirty?: boolean // 待清理状态
  rules?: Array<any>

  // render(renderOption?:RenderOption): ReactElement | null

  canDrag(): boolean
  canBeDroped(element?: IElement): boolean
  canDropTo(element: IElement): boolean
  canRemove(): boolean

  renderBefore(props: any, renderOption?: RenderOption): React.ReactElement | null
  renderAfter(props: any, renderOption?: RenderOption): React.ReactElement | null

  // getClientRect(): RECT

  defaultProps(): StaticPropsType

  /**
  * 是否为行内元素
  */
  isInline(): boolean

  ctor(): ElementContructor // 获取构造类型

  // 获取某个属性定义的类型
  getPropType(name: string): string
  prepareProps(props: any): any

  getComponent(): typeof React.Component | SFC
  getRenderedDom(): HTMLElement | undefined

  getClientRect(): RECT

  // getComponent(): typeof React.Component | SFC

  jsonData(): JsonFormat
}
