import { XYCoord } from "dnd-core"
import memorize from 'fast-memoize'
import IElement from '../element/IElement'
// import { getItem } from './element/RenderCache'
import { DropPlace, RECT } from '../../types'
export * from './layout'

const PLACEHOLDER_SIZE = 2

/**
 * 浅对比
 */
export const shallowCompare = (obj1: any, obj2: any) => {
  if (!obj1 && !obj2) {
    return true
  }

  return obj1 && obj2 && Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(
      key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    )
}

/**
 * 将 value 转为指定类型
 */
export const parseValue = (value: any, type: string) => {
  switch(type) {
    case 'string':
      return value
    case 'number':
      return +value
    case 'boolean':
      return !!value
    default:
      return value
  }
}

/**
 * 校验参数并将参数转化为数组
 */
export const ensureArray = <T>(obj: T | Array<T>): Array<T> => {
  return Array.isArray(obj) ? obj : [obj]
}

/**
 * 获取唯一 key
 */
export const genKey = (): string => {
  return Math.random().toFixed(16).split('.')[1]
}

// check point in rect
const inRect = (point: XYCoord, rect: RECT) => {
  const { x, y } = point
  const { x: rx, y: ry, width = 0, height = 0 } = rect

  return x > rx && x < rx + width && y > ry && y < ry + height
}

const hRect = (rect: RECT, addon: any = {}): RECT => {
  return { ...rect, height: PLACEHOLDER_SIZE, ...addon}
}

const wRect = (rect: RECT, addon: any = {}): RECT => {
  return { ...rect, width: PLACEHOLDER_SIZE, ...addon }
}

// 在控件列表中计算合适的插入位置
const calculateDropPlace = (from: IElement, to: IElement, clientOffset: XYCoord): DropPlace | null => {
  const list = to.children || []
  const { x, y, width, height } = to.getClientRect()

  // console.log('calculate', containerRect)

  if (!list || list.length === 0) {
    // console.log('first child', hRect({ x, y, width, height }))
    return { container: to, position: hRect({ x, y, width, height }), index: 0 }
  }

  let nearest: IElement | null = null
  let nearestIndex: number = -1
  let nearestRect: RECT & { center: XYCoord } | null = null
  let distance = Number.POSITIVE_INFINITY
  const { x: clientX, y: clientY } = clientOffset

  // find the nearest element
  const len = list.length
  for (let i = 0; i < len; i++) {
    const temp = list[i]

    if (temp.key === from.key) {
      continue
    }

    // const next = list[i + 1]
    const { x, y, width = 0, height = 0 } = temp.getClientRect()
    const center = { x: x + width / 2, y: y + height / 2 }

    // the only child that contains mouse pointer
    if (inRect(clientOffset, { x, y, width, height })) {
      // if (temp.type === 'plain-text') {
      //   debugger
      // }
      nearest = temp
      nearestRect = { x, y, width, height, center }
      nearestIndex = i
      break
    }

    // const { x: nextX, y: nextY, width: nextWidth = 0, height: nextHeight = 0 } = next.getClientRect()
    const tempDistance = Math.pow(clientX - center.x, 2) + Math.pow(clientY - center.y, 2)
    if (tempDistance < distance) {
      distance = tempDistance
      nearest = temp
      nearestRect = { x, y, width, height, center }
      nearestIndex = i
    }
  }

  if (nearest && nearestRect) {
    const { x, y, width = 0, height = 0, center } = nearestRect
    let dom = nearest.getRenderedDom()
    dom = (dom && (nearest.canBeDroped() ? dom.parentElement : dom)) as HTMLElement
    if (!dom) {
      // console.log('no valid dom node')
      return null
    }

    const realStyle = window.getComputedStyle(dom)
    const display = realStyle.display
    const float = realStyle.cssFloat
    // decide placeholder is horizontal or vertical
    let inline = display === 'inline-block' || display === 'inline' || float !== 'none'
    // console.log(dom, display, inline, float, center)

    if (inline) {
      if (clientX < center.x) { // left side
        // console.log('left')
        return {
          container: to,
          position: wRect(nearestRect, { x }),
          index: nearestIndex
        }
      } else {
        // console.log('right')
        return {
          container: to,
          position: wRect(nearestRect, { x: x + width }),
          index: nearestIndex + 1
        }
      }
    } else {
      if (clientY < center.y) {
        // console.log('top')
        return {
          container: to,
          position: hRect(nearestRect, {y: y - PLACEHOLDER_SIZE}),
          index: nearestIndex
        }
      } else {
        // console.log('bottom')
        return {
          container: to,
          position: hRect(nearestRect, {y: y + (height || 0)}),
          index: nearestIndex + 1
        }
      }
    }
  }

  return null
}

// get nearest dropable element
const nearestDropable = (from: IElement, to: IElement | null ): IElement | null => {
  while(to) {
    // console.log('check', to.type, from.type)
    if (from.canDropTo(to) && to.canBeDroped(from)) {
      // console.log('found')
      return to
    }

    to = to.parent || null
  }

  return null
}

// check whether 'from' element is same as or the ancestor of 'to' element
const isAncestor = (from: IElement, to: IElement | null) => {
  while(to) {
    if (to.key === from.key) {
      console.warn('can not drop to a sub element')
      return true
    }

    to = to.parent || null
  }

  return false
}

/**
 * 根据拖动元素和底层元素获取正确的放置位置，在拖动元素时使用此函数进行运算
 * @returns 待放入的容器元素，插入点坐标和放置位置（索引）
 */
export const getDropPlace = memorize(
  (from: IElement, to: IElement | null, clientOffset: XYCoord | null): DropPlace | null =>  {
  if (!from || !to || !clientOffset || from.key === to.key) {
    return null
  }

  if (isAncestor(from, to)) {
    // console.log('isAncestor')
    return null
  }

  if (!from.canDropTo(to) || !to.canBeDroped(from)) {
    // console.log('drop', from, to)
    to = nearestDropable(from, to)
    // console.log('check parent', from, to)
    if (!to) { // 上级元素也不支持拖入
      // console.log('no parent')
      return null
    }
  }

  return calculateDropPlace(from, to, clientOffset)
}
, {
  serializer: (arg: any) => {
    const [ from, to, cood ] = arg
    return `${from.key}_${to.key}_${cood.x}_${cood.y}`
  }
})
