import React, { ReactNode } from "react"
import { OwnProps, RECT } from "../../types"
import IElement from "../element/IElement"
// import styles from './index.module.less'
import BoxContent from "./BoxContent"
import DraggableWrapper from "./DraggableWrapper"
import { inject, observer } from "mobx-react"

type StateType = {
  isActive: boolean
}

/**
 * 封装控件
 */
@inject('rootStore')
@observer
class ElementBox extends React.Component<OwnProps, StateType> {
  public ref: React.RefObject<BoxContent>

  constructor(props: OwnProps) {
    super(props)
    this.ref = React.createRef()

    this.state = {
      isActive: props.rootStore!.selectedElement.key === props.element.key,
    }
  }

  handleClick = (e: React.MouseEvent) => {
    const { element, rootStore } = this.props

    rootStore!.selectElement(element)
    e.stopPropagation()
  }

  removeElement = (element: IElement) => {
    if (!element) {
      return
    }

    const { rootStore } = this.props
    rootStore!.removeElement(element)
  }

  // 获取元素所占区域
  getClientRect(): RECT {
    const { current } = this.ref
    return current!.getClientRect()
  }

  render(): ReactNode {
    const {
      element, children, rootStore
    } = this.props
    const isActive = rootStore!.selectedElement.key === element.key

    const cls: { [key: string]: any } = {}

    if (this.props.className) {
      cls[this.props.className] = true
    }

    return (
      <DraggableWrapper
        ref={this.ref}
        element={element}
        cls={cls}
        isActive={isActive}
        onClick={this.handleClick.bind(this)}
        onRemove={this.removeElement.bind(this)}
      >
        {children}
      </DraggableWrapper>
    )
  }
}

export default ElementBox
