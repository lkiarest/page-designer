import React, { ReactNode } from "react"
import ReactDOM from "react-dom"
// import classnames from 'classnames'
import { OwnProps, RECT } from "../../types"
import IElement from "../element/IElement"
import BoxContent from "./BoxContent"
import DraggableWrapper from "./DraggableWrapper"
import { inject, observer } from "mobx-react"
import eventBus, { EventTypes } from '../utils/eventBus'
import styles from './index.module.less'

type StateType = {
  isActive: boolean,
  draggerStyle?: Object,
  boxLayout: RECT
}

/**
 * 封装控件
 */
@inject('rootStore')
@observer
class LeafBox extends React.Component<OwnProps, StateType> {
  public ref: React.RefObject<BoxContent>
  public componentRef: React.RefObject<any>

  constructor(props: OwnProps) {
    super(props)
    this.ref = React.createRef()
    this.componentRef = React.createRef()

    this.reLayout = this.reLayout.bind(this)

    this.state = {
      isActive: props.rootStore!.selectedElement.key === props.element.key,
      draggerStyle: {
        // opacity: 0,
        position: 'absolute',
      },
      boxLayout: {
        x: 0, y: 0, width: 0, height: 0
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.reLayout()
    }, 400) // 等待动画结束才能拿到元素的布局信息

    eventBus.addListener(EventTypes.LEAF_LAYOUT, this.reLayout)
  }

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     this.reLayout()
  //   }, 400) // 等待动画结束才能拿到元素的布局信息
  // }

  componentWillUnmount() {
    eventBus.removeListener(EventTypes.LEAF_LAYOUT, this.reLayout)
  }

  reLayout() {
    // const rect = this.props.element.getClientRect()
    const dom = ReactDOM.findDOMNode(this.componentRef.current) as HTMLElement
    if (dom) {
      const { offsetTop: y, offsetLeft: x, offsetWidth: width, offsetHeight: height } = dom
      const oldLayout = this.state.boxLayout
      if (x === oldLayout.x && y === oldLayout.y && width === oldLayout.width && height === oldLayout.height) {
        return
      }

      // console.log('relayout')
      this.setState({
        boxLayout: { x, y, width, height }
      })
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

    const cls = {
      [styles.box]: true,
      // [styles.box_in_item]: true,
      [styles.active]: isActive
    }

    const comp = children
    const compStyle = comp.props.style || {}
    const renderedChild = children ? React.cloneElement(comp, {
      style: {
        ...compStyle,
        // zIndex: 3,
        // border: '1px dashed rgba(90, 90, 90, 0.2)',
      },
      // className: cls,
      ref: this.componentRef
    }) : children

    const {boxLayout, draggerStyle} = this.state

    const boxStyle = {
      ...draggerStyle,
      // left: `${boxLayout.x + 1}px`,
      // top: `${boxLayout.y + 1}px`,
      left: 0,
      top: 0,
      width: `${boxLayout.width || 1 - 1}px`,
      height: `${boxLayout.height || 1 - 1}px`,
      transform: `translate3d(${boxLayout.x + 1}px, ${boxLayout.y + 1}px, 0)`
    }

    return (
      <React.Fragment>
        {renderedChild}
        <div className={styles.dragger}>
          <DraggableWrapper
            ref={this.ref}
            element={element}
            isActive={isActive}
            style={boxStyle}
            cls={cls}
            onClick={this.handleClick.bind(this)}
            onRemove={this.removeElement.bind(this)}
          >
          </DraggableWrapper>
        </div>
      </React.Fragment>
    )
  }
}

export default LeafBox
