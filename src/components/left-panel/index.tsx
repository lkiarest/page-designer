import React from 'react'
import ControlList from './ControlList'
import styles from './index.module.less'

export default class LeftPanel extends React.Component {
  render() {
    return (
      <div className={styles.panel}>
        
        <ControlList></ControlList>
      </div>
    )
  }
}
