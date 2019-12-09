import React from 'react'
import { Modal, Button } from 'antd'
import AntRender from '../form-render/AntRender'
import { JsonFormat, ValidateRule } from '../../types'
import styles from './index.module.less'

type PropType = {
  jsonSchema?: Array<JsonFormat>,
}

type StateType = {
  visible: boolean,
  formData: any
}

const findAllRules = (jsonSchema: Array<JsonFormat>, result:{[key: string]: ValidateRule[]} = {}) => {
  jsonSchema.forEach(item => {
    // only support rule check for input control
    if (item.name && item.type === 'input' && item.rules) {
      const dataType = item.dataType ? { type: item.dataType } : null
      if (dataType) {
        result[item.name] = [dataType, ...item.rules]
      } else {
        result[item.name] = [...item.rules]
      }
    }

    if (item.children) {
      findAllRules(item.children, result)
    }
  })

  return result
}

class Preview extends React.Component<PropType, StateType> {
  modal: React.RefObject<Modal>
  ref: React.RefObject<HTMLDivElement>

  constructor(props: PropType) {
    super(props)
    this.modal = React.createRef()
    this.ref = React.createRef()

    this.state = {
      visible: false,
      formData: {}
    }
  }

  preview = (): void => {
    this.setState({
      visible: true
    })
  }

  showData = () => {
    const { formData } = this.state
    console.info('form data:', formData)
  }

  onChange = (formData: any) => {
    this.setState({
      formData
    })
  }

  handleCancel = (e: any) => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { jsonSchema } = this.props
    const { formData } = this.state
    const rules = findAllRules(jsonSchema || [])

    return jsonSchema && (
      <div className={styles.preview}>
        <Button type="link" size="small" onClick={this.preview}>预览</Button>
        <Modal
          title="页面预览"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          okText="获取数据"
          onOk={this.showData}
          destroyOnClose
          width="100%"
          style={{top: 0}}
          ref={this.modal}
        >
          <AntRender
            propSchema={jsonSchema}
            formData={formData}
            rules={rules}
            onChange={this.onChange}
          />
        </Modal>
      </div>
    )
  }
}

export default Preview
