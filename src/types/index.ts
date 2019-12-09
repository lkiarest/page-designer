import IElement from '../core/element/IElement'
import { ConnectDragSource, ConnectDropTarget } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import { Store } from '../store'
import { ReactNode } from 'react'
import ElementCategory from '../core/element/ElementCategory'

// key 为 string 的普通对象
export type PlainObjectType = {
  [key: string]: any
}

export type POINT = {
  x: number,
  y: number,
}

// 元素区域
export type RECT = POINT & {
  width?: number,
  height?: number,
  bottom?: number,
  right?: number,
}

export type ModelType = "string" | "number" | "boolean" | "object" | "regexp" | "array" | "date" | "url" | "email" | undefined

export type InternalRule = 'required' | 'min' | 'max' | 'len' | 'pattern'

export type ValidateRule = {
  name?: InternalRule,
  type?: ModelType,
  required?: boolean,
  pattern?: string,
  min?: number, // Range of type 'string' and 'array'
  max?: number, // Range of type 'string' and 'array'
  len?: number, // Length of type 'string' and 'array'
}

export type RuleItem = {[key: string]: ValidateRule[]}

// 控件的 json 表示
export type JsonFormat = {
  key: string,
  type: string,
  props: any,
  value?: any,
  name?: string,
  dataType?: ModelType,
  rules?: Array<RuleItem>,
  children?: Array<JsonFormat>
}

// 拖动时关联的类型
export type DragItemType = {
  element: IElement
}

export interface DragConnectedProps {
  isDragging: boolean,
  connectDragSource: ConnectDragSource,
  dragItem: DragItemType,
}

export interface DropConnectedProps {
  isOver: boolean,
  connectDropTarget: ConnectDropTarget,
  dropItem: DragItemType,
  clientOffset: XYCoord | null
}

export type OwnProps = {
  className?: string,
  element: IElement,
  rootStore?: Store,
  children?: any
}

// 拖动放置的位置
export type DropPlace = {
  container: IElement,
  position: RECT,
  index: number
}

// 可拖动组件的属性
export type AllProps = OwnProps & DragConnectedProps & DropConnectedProps

export type DraggableBoxProps = {
  element: IElement,
  cls?: { [x: string]: boolean },
  style?: Object,
  onClick?: any,
  children: ReactNode[] | ReactNode,
  onRemove?: Function,
  connectDragSource: ConnectDragSource,
  connectDropTarget: ConnectDropTarget,
  isDragging: boolean,
  isOver: boolean,
  isActive: boolean
}

// 默认属性值
export type CommonPropType = {
  label?:string,
  value?: any,
  name?: string,
  default?: any,
  props?: any
  type: string,
  dataType?: ModelType,
  [key: string]: any,
}

// 默认注入控件 class 的类型
export type StaticMemberDeco = {
  displayName: string,
  category?: ElementCategory,
  type: string,
  icon?: string,
  props?: any,
  inline?:boolean // 是否为行内元素
  checkDataType?: boolean,// 是否需要校验数据类型
}

// 拖动时计算移入的元素用
export type HoverItem = {
  element: IElement,
  el: HTMLElement
}

// 默认属性列表
export type StaticPropsType = Array<CommonPropType>

// 控件选项
export type OptionType = {
  type: string,
  props?: any,
  key?: string,
  name?:string,
  dataType?: ModelType // 绑定数据类型
  rules?: Array<RuleItem> // 校验规则
  children?: Array<OptionType>
}

// 控件数据类型
export type ValueDataType = Map<string, ModelType>

export type VALIDATE_STATUS = "" | "error" | "success" | "warning" | "validating" | undefined
