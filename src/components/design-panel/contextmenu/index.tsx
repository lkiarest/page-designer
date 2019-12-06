import React, { ReactElement } from 'react'
import { observer,inject } from "mobx-react"
import { Store } from '../../../store'
import eventBus, { EventTypes } from '../../../core/utils/eventBus'
import IElement from '../../../core/element/IElement'
import { POINT } from '../../../types'
import styles from './index.module.less'

interface OwnProps {
  // elements: Array<ElementOption>,
  rootStore?: Store
}

interface OwnState {
  // elements: Array<ElementOption>,
  visible: boolean,
  point?: POINT,
  element?: IElement,
}

@inject('rootStore')
@observer
class ContextMenu extends React.Component<OwnProps, OwnState> {
  ref: React.RefObject<HTMLDivElement>

  constructor(props: OwnProps) {
    super(props)

    this.ref = React.createRef()
    this.state = {
      visible: false,
    }
  }

  showMenu = (e : { point: POINT, element: IElement }) => {
    this.setState({
      visible: true,
      point: e.point,
      element: e.element
    }, () => {
      setTimeout(() => {
        const current = this.state.point!
        const adjusted = this.adjustPos(e.point)
        if (adjusted.x !== current.x || adjusted.y !== current.y) {
          this.setState({
            point: adjusted
          })
        }
      }, 0)
    })
  }

  hideMenu = () => {
    this.setState({
      visible: false,
      point: undefined,
      element: undefined
    })
  }

  onBodyClick = (e: any) => {
    if (this.ref.current && this.ref.current!.contains(e.target)) {
      return
    }

    this.hideMenu()
  }

  componentWillMount() {
    eventBus.addListener(EventTypes.CONTEXT_MENU, this.showMenu)
    document.addEventListener('click', this.onBodyClick, false)
  }

  componentWillUnmount() {
    eventBus.removeListener(EventTypes.CONTEXT_MENU, this.showMenu)
    document.removeEventListener('click', this.onBodyClick, false)
  }

  /**
   * 根据窗口调整弹出框的位置
   * @param pointer 当前位置
   */
  adjustPos(current: POINT): POINT {
    const { current: box } = this.ref
    if (!box) {
      return { x: 0, y: 0}
    }

    const currentRect = box.getBoundingClientRect()
    const { left, top, right, bottom } = currentRect
    const { clientWidth, clientHeight} = document.documentElement

    let retX = left
    let retY = top

    if (bottom > clientHeight) {
      retY = top - bottom + clientHeight
    }

    if (right > clientWidth) {
      retX = left - right + clientWidth
    }

    return { x: retX, y: retY }
  }

  onDel = (e: any) => {
    if (this.state.element) {
      this.props.rootStore!.removeElement(this.state.element)
    }

    this.hideMenu()
  }

  onCopy = () => {
    if (this.state.element) {
      this.props.rootStore!.cloneElement(this.state.element)
    }

    this.hideMenu()
  }

  render(): ReactElement | null {
    const { point, element } = this.state

    if (!point || !element) {
      return null
    }

    const { x, y } = point

    const menuStyle = {
      transform: `translate3d(${x}px, ${y}px, 0)`
    }

    return this.state.visible ? (
      <div className={styles.contextmenu}>
        <div className={styles.menu_panel} style={menuStyle} ref={this.ref}>
          <div className={styles.menu_panel__header}>
            <span className={styles.menu_panel__header__type}>{element.type}</span>
            {
              element.name && (<span className={styles.menu_panel__header__name}> | {element.name}</span>)
            }
          </div>
          <ul className={styles.menu_panel__body}>
            <li className={styles.menu_panel__item} onClick={this.onDel}>删除</li>
            <li className={styles.menu_panel__item} onClick={this.onCopy}>复制</li>
          </ul>
        </div>
      </div>
    ) : null
  }
}

export default ContextMenu
