import React from 'react'
import { inject } from 'mobx-react'
import { Tabs } from 'antd'
import ControlPanel from './basic-panel'
import StylePanel from './style-panel'
import DataPanel from './data-panel'
import styles from './index.module.less'
import { ElementProvider } from '../../core/element/ElementContext'
import { RENDER_MODE_DESIGN } from '../../configs'

const { TabPane } = Tabs

@inject('rootStore')
export default class extends React.Component<any, {
  current: string
}> {
  constructor(props: any) {
    super(props)

    this.state = {
      current: 'basic'
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e: React.ChangeEvent, name: string) {
    const { rootStore } = this.props
    rootStore && rootStore.handleFormChangeEvent(e, name)
  }

  render(): JSX.Element {
    const { current } = this.state

    return (
      <ElementProvider value={{ mode: RENDER_MODE_DESIGN, onChange: this.onChange }}>
        <div className={styles.panel}>
          <div className={styles.title}>控件属性</div>
          <Tabs
            defaultActiveKey={current}
            onChange={index => this.setState({ current: index })}
            size="small"
            tabBarStyle={{padding: '0 8px'}}
            className={styles.panel_tabs}
          >
            <TabPane tab="基本属性" key="basic" style={{padding: '4px 0'}}>
              <div className={styles.controls}>
                <ControlPanel />
              </div>
            </TabPane>
            <TabPane tab="样式" key="style" style={{padding: '4px 0'}}>
              <div className={styles.controls}>
                <StylePanel />
              </div>
            </TabPane>
            <TabPane tab="数据" key="data" style={{padding: '4px 0'}}>
              <div className={styles.controls}>
                <DataPanel />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </ElementProvider>
    )
  }
}
