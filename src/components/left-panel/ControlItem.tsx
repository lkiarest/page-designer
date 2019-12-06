import React, { ReactElement } from 'react'
import { Icon } from 'antd'
import {DragSource, DragSourceMonitor, DragSourceConnector, ConnectDragSource} from 'react-dnd'
import {DragTypes} from '../../configs'
import styles from './index.module.less'
import { ElementContructor } from '../../core/element/IElement'
import ElementOption from '../../core/ElementOption'
import { DragItemType, PlainObjectType } from '../../types'
import { Store } from '../../store'
import { observer, inject } from 'mobx-react'

interface ConnectedProps {
  isDragging: boolean,
  connectDragSource: ConnectDragSource
}

type DragProps = {
  control: ElementContructor,
  rootStore?: Store,
  // element: Element
}

type AllProps = DragProps & ConnectedProps

const spec = {
  beginDrag(props: DragProps, monitor: DragSourceMonitor, component: ControlItem): DragItemType {
    const ControlCtor = props.control
    const defaultProps = ControlCtor.props || []

    const newElem = new ControlCtor(new ElementOption({ // 创建默认元素
      type: ControlCtor.type,
      props: {
        label: ControlCtor.displayName,
        ...defaultProps.reduce((ret: PlainObjectType, item) => {
          if (item.name && item.default) {
            ret[item.name] = item.default
          }
          return ret
        }, {})
      }
    }))

    if (newElem.canBeDroped()) {
      newElem.children = []
    }

    return {
      element: newElem
    }
  },
  endDrag(props: DragProps, monitor: DragSourceMonitor, component: ControlItem) {
    const store: Store | undefined = component.props.rootStore
    const droped = monitor.getDropResult()
    if (!droped) {
      store!.clearHover()
      return
    }

    let { placeholder } = store!
    if (!placeholder) {
      return
    }

    const from = monitor.getItem().element

    if (from) {
      store!.moveElement(
        from,
        placeholder
      )
    }

    store!.clearHover()
  }
}

const connect = function(connect: DragSourceConnector, monitor: DragSourceMonitor): ConnectedProps {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ControlItem extends React.Component<AllProps> {
  render(): ReactElement<{props: AllProps}> | null {
    const { control, connectDragSource } = this.props

    return connectDragSource(
      <div className={styles.item}>
        <Icon type={control.icon} />
        <span className={styles.item__title}>{ control.displayName}</span>
      </div>
    )
  }
}

export default DragSource(DragTypes.CARD, spec, connect)(inject('rootStore')(observer(ControlItem)))
