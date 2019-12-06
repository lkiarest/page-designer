import React from 'react'
import { Button, Input, Modal, message } from 'antd'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import JsonView from '../json-view'
import History from './History'
import Preview from './Preview'
import { Store } from '../../store'
import styles from './index.module.less'

const { TextArea } = Input

type CompStateType = {
  showJson: boolean,
  jsonData: object
  showImport: boolean,
  jsonImported: string,
}

@inject('rootStore')
@observer
class Center extends React.Component<{
  rootStore?: Store
}, CompStateType> {
  constructor(props: {
    rootStore?: Store
  }) {
    super(props)

    this.state = {
      showJson: false,
      jsonData: {},
      showImport: false,
      jsonImported: '',
    }
  }

  importJson = (): void => {
    this.setState({
      showImport: true,
      jsonImported: ''
    })
  }

  // 执行配置数据导入
  doImport = (): void => {
    const store = this.props.rootStore

    let jsonObj = null

    try {
      jsonObj = JSON.parse(this.state.jsonImported)
    } catch(e) {
      console.warn(e.message)
      message.error('无效的 JSON 格式，请检查输入')
      return
    }

    store!.loadElements(jsonObj)
    this.setState({
      showImport: false
    })
  }

  generateJson = (): void => {
    this.setState({
      jsonData: this.props.rootStore!.jsonData,
      showJson: true
    })
  }

  hideJson = (): void => {
    this.setState({
      showJson: false
    })
  }

  doCopy = (): void => {
    const { jsonData } = this.state
    navigator.clipboard.writeText(JSON.stringify(jsonData))
    message.success('已将此配置复制到粘贴板')
  }

  render() {
    const dlgStyle = {
      height: '425px', overflow: 'auto'
    }

    const store = this.props.rootStore!

    return (
      <div className={styles.menulist}>
        <Button type="link" size="small" onClick={this.importJson}>导入配置</Button>
        <Button type="link" size="small" onClick={this.generateJson}>生成配置</Button>
        <History />
        <div className={styles.right}>
          <Preview jsonSchema={toJS(store.jsonData)} />
        </div>
        <Modal
          title="导入配置"
          cancelText="关闭"
          okText="导入"
          centered
          visible={this.state.showImport}
          onOk={this.doImport}
          onCancel={() => this.setState({ showImport: false})}
          bodyStyle={dlgStyle}
        >
          <TextArea
            className={styles.import_text}
            value={this.state.jsonImported}
            onChange={(e) => this.setState({ jsonImported: e.target.value})}
          />
        </Modal>
        <Modal
          title="生成配置"
          cancelText="关闭"
          okText="复制"
          centered
          visible={this.state.showJson}
          onOk={this.doCopy}
          onCancel={this.hideJson}
          bodyStyle={dlgStyle}
        >
          <JsonView json={this.state.jsonData} />
        </Modal>
      </div>
    )
  }
}

export default Center
