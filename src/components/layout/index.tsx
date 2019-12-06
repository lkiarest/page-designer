import React, { ReactNode } from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'
import { triggerLayoutChange } from '../../core/utils'
import styles from './layout.module.less'

export default class Layout extends React.Component<{
  header?: ReactNode,
  left?: ReactNode,
  center?: ReactNode,
  right?: ReactNode,
  footer?: ReactNode
}, { leftPanel: boolean, rightPanel: boolean }> {
  constructor(props: any) {
    super(props)

    this.state = {
      leftPanel: true,
      rightPanel: true
    }
  }

  toggleLeft = () => {
    this.setState({
      leftPanel: !this.state.leftPanel
    }, () => triggerLayoutChange(100))
  }

  toggleRight = () => {
    this.setState({
      rightPanel: !this.state.rightPanel
    }, () => triggerLayoutChange(100))
  }

  render() {
    const {
      header,
      left,
      center,
      right,
      footer,
    } = this.props

    const { leftPanel, rightPanel } = this.state

    const layoutCls = classnames({
      [styles.layout]: true,
      [styles.hide_left]: !leftPanel,
      [styles.hide_right]: !rightPanel
    })

    return (
      <div className={layoutCls}>
        <div className={styles.header}>
          {header}
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            {left}
            <Icon
              type={leftPanel ? "double-left" : "double-right"}
              className={styles.collapseLeft}
              onClick={this.toggleLeft}
            />
          </div>
          <div className={styles.center}>
            {center}
          </div>
          <div className={styles.right}>
            {right}
            <Icon
              type={rightPanel ? "double-right" : "double-left"}
              className={styles.collapseRight}
              onClick={this.toggleRight}
            />
          </div>
        </div>
        <div className={styles.footer}>
          {footer}
        </div>
      </div>
    )
  }
}
