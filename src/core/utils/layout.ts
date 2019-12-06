/**
 * which attribute change will cause reflow
 */
import eventBus, { EventTypes } from './eventBus'
import { POINT } from '../../types'
import IElement from '../element/IElement'

eventBus.setMaxListeners(1000) // support 1000 controls

const REFLOW_ATTRS: {
  [key: string]: boolean
} = [
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'transform',
  'transformOrigin',
  'perspectiveOrigin',
  'translate',
].reduce((ret, item) => ({
  ...ret,
  [item]: true
}), {})

/**
 * check whether a css attribute change will cause reflow
 * @param name attribute name
 */
export const willReflow = (name: string) => {
  return !!REFLOW_ATTRS[name]
}

/**
 * notify change event to all layout listeners
 * @param delay event delay (ms), default: 0
 */
export const triggerLayoutChange = (delay: number = 0) => {
  setTimeout(() => {
    // console.debug('box layout update !')
    eventBus.emit(EventTypes.LEAF_LAYOUT)
  }, delay)
}

/**
 * show context menu
 */
export const showContextView = (point: POINT, element: IElement) => {
  eventBus.emit(EventTypes.CONTEXT_MENU, {
    point, element
  })
}
