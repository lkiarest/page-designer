import { inject, observer } from "mobx-react"
import React from "react"
import IElement from "./IElement"
import { Store } from "../../store"
import { ROOT_PAGE } from "../../configs"
import styles from './element.module.less'

@inject('rootStore')
@observer
class ElementOperation extends React.Component<{
  parent?: IElement,
  rootStore?: Store
}> {
  render() {
    const {parent, rootStore} = this.props
    if (!parent || parent.key === ROOT_PAGE) {
      return null
    }

    const active = parent && parent.key === rootStore!.selectedElement.key

    return active && (
      <div className={styles.opts}>
        {
          parent && parent.canRemove() && (
            <div className={styles.btn} onClick={() => rootStore!.removeElement(parent)}>删除</div>
          )
        }
        <span className={styles.split}>|</span>
        <div className={styles.btn} onClick={() => alert('TODO')}>复制</div>
      </div>
    )
  }
}

export default ElementOperation

