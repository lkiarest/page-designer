import React from 'react'
import Menus from './menus'
import DesignPanel from '../design-panel'
import styles from './index.module.less'

class Center extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles.menus}>
          <Menus />
        </div>
        <DesignPanel></DesignPanel>
      </React.Fragment>
    )
  }
}

export default Center
