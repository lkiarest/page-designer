import React from 'react'
import CurrentControl from './CurrentControl'
import styles from './index.module.less'

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <CurrentControl />
        </div>
      </div>
    )
  }
}
