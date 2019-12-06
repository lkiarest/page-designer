import { ElementContructor } from "./core/element/IElement"

export const DragTypes = {
  CARD: 'CARD'
}

export type DragProps = {
  control: ElementContructor
}

// 根节点约定命名
export const ROOT_PAGE = 'root_page'

// 事件名称
export const STYLE_NAME_PREFIX = 'style!'
export const DATA_NAME_PREFIX = 'data!'
export const PROP_NAME_PREFIX = 'prop!'

// render mode
export const RENDER_MODE_DESIGN = 'design'
export const RENDER_MODE_PREVIEW = 'preview'
