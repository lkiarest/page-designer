import React from 'react'
import ELement from './Element'
import styles from './element.module.less'

class PageComponent extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        {this.props.children}
      </div>
    )
  }
}

export default class PageElement extends ELement {
  public static icon: string = ''
  public static displayName: string = '根节点'

  _getComponent(): typeof React.Component {
    return PageComponent
  }

  canDrag(): boolean {
    return false
  }

  canBeDroped(): boolean {
    return true
  }

  canRemove(): boolean {
    return false
  }
}
