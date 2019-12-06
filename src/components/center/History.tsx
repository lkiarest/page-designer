import React from 'react'
import classnames from 'classnames'
import { Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import { Store } from '../../store'
import styles from './index.module.less'

@inject('rootStore')
@observer
class History extends React.Component<{
  rootStore?: Store
}> {
  undo = (): void => {
    if (!this.props.rootStore!.canUndo) {
      return
    }
    this.props.rootStore!.undo()
  }

  redo = (): void => {
    if (!this.props.rootStore!.canRedo) {
      return
    }

    this.props.rootStore!.redo()
  }

  render() {
    const historyCls = classnames({
      [styles.history]: true,
      [styles.history__can_undo]: this.props.rootStore!.canUndo,
      [styles.history__can_redo]: this.props.rootStore!.canRedo,
    })

    const undoCls = classnames({
      [styles.history__icon]: true,
      [styles.history__icon__undo]: true
    })

    const redoCls = classnames({
      [styles.history__icon]: true,
      [styles.history__icon__redo]: true
    })

    return (
      <div className={historyCls}>
        <Icon className={undoCls} type="undo" title="撤销" onClick={this.undo} />
        <Icon className={redoCls} type="redo" title="恢复" onClick={this.redo} />
      </div>
    )
  }
}

export default History
