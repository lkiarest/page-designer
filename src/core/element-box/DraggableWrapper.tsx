import React from "react"
import { throttle } from "lodash"
import { OwnProps, DragItemType, DragConnectedProps, DropConnectedProps } from "../../types"
import { DragSourceMonitor, DragSourceConnector, DropTargetMonitor, DropTargetConnector, DropTarget, DragSource } from "react-dnd"
import ElementBox from "./ElementBox"
import { DragTypes } from "../../configs"
import BoxContent from "./BoxContent"
import { getDropPlace } from '../utils'

const HOVER_INTERVAL = 100 // 节流，防止 move 事件执行太频繁

const dragSpec = {
  beginDrag(props: OwnProps, monitor: DragSourceMonitor, component: ElementBox): DragItemType {
    return {
      element: props.element,
    }
  },
  endDrag(props: OwnProps, monitor: DragSourceMonitor, component: ElementBox) {
    if (!component) {
      return
    }

    const { rootStore: store } = component.props
    const droped = monitor.getDropResult()
    if (!droped) {
      store!.clearHover()
      return
    }

    // const { element: to} = droped
    const { placeholder } = store!

    if (!placeholder) {
      return
    }

    store!.moveElement(monitor.getItem().element, placeholder)
    component.props.rootStore!.clearHover()
  },
  canDrag(props: OwnProps, monitor: DragSourceMonitor) {
    return props.element.canDrag()
  }
}

const dragConnect = function(connect: DragSourceConnector, monitor: DragSourceMonitor):
DragConnectedProps {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    dragItem: monitor.getItem()
  }
}

// 将一个控件拖动到其他控件上时实时计算放置区域
const handleHover = throttle(function(props: OwnProps, monitor: DropTargetMonitor, component: ElementBox) {

  const store = component.props.rootStore

  if (!monitor.isOver({ shallow: true })) {
    store!.clearHover()
    return
  }

  let to = props.element // already placed element

  const dragItem = monitor.getItem() // dragging element

  if (!to || to.type === 'null' || !dragItem || !dragItem.element || to.key === dragItem.key) { // 不处理
    store!.clearHover()
    return
  }

  const from = dragItem.element
  const dropHolder = getDropPlace(from, to, monitor.getClientOffset())
  if (dropHolder) {
    store!.setPlaceHolder(dropHolder)
  } else {
    store!.clearHover()
  }
}, HOVER_INTERVAL)

const dropSpec = {
  canDrop(props: OwnProps, monitor: DropTargetMonitor) {
    // return props.element.canBeDroped()
    return true
  },
  drop(props: OwnProps, monitor: DropTargetMonitor, component: ElementBox) {
    if (monitor.didDrop()) {
      return
    }

    const { element } = props

    return {
      element
    }
  },
  hover(props: OwnProps, monitor: DropTargetMonitor, component: ElementBox) {
    handleHover(props, monitor, component)
  }
}

const dropCollect = function(connect: DropTargetConnector, monitor: DropTargetMonitor): DropConnectedProps {
  return {
    isOver: monitor.isOver({ shallow: true }),
    connectDropTarget: connect.dropTarget(),
    dropItem: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
  }
}

const DraggableWrapper = React.memo(DropTarget(DragTypes.CARD, dropSpec, dropCollect)(DragSource(DragTypes.CARD, dragSpec, dragConnect)(BoxContent)))

export default DraggableWrapper
