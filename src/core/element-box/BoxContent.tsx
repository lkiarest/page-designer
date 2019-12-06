import { inject } from "mobx-react"
import React from "react"
import classnames from 'classnames'
import { DraggableBoxProps, RECT } from "../../types"
import { showContextView } from "../utils"
import styles from './index.module.less'

@inject('rootStore')
class BoxContent extends React.Component<DraggableBoxProps> {
  private ref: any

  constructor(props: DraggableBoxProps) {
    super(props)
    this.ref = React.createRef()
  }

  getClientRect(): RECT {
    const { current } = this.ref
    return current.getBoundingClientRect()
  }

  handleContextMenu = (e: any) => {
    if (this.props.element && this.props.element.type) {
      showContextView({
        x: e.clientX,
        y: e.clientY,
      }, this.props.element)

      e.preventDefault()
    }
  }

  render() {
    const {
      cls, style, isDragging, isOver, isActive,
      onClick, children,
      connectDragSource, connectDropTarget
    } = this.props

    const inline = this.props.element.isInline()

    const mergedCls = classnames({
      ...cls,
      [styles.active]: isActive,
      [styles.dragging]: !!isDragging,
      [styles.over]: !!isOver,
      [styles.box]: true,
      [styles.box_inline]: inline,
    })

    return connectDropTarget(connectDragSource(
      <div
        ref={this.ref}
        className={mergedCls}
        style={style}
        onClick={onClick}
        onContextMenu={this.handleContextMenu}
      >
        {children}
      </div>
    ))
  }
}

export default BoxContent
