import React from 'react'
// import ReactDom from 'react-dom'
import { Modal, Button } from 'antd'
// import { inject, observer } from 'mobx-react'
// import { Store } from '../../store'
// import FormRenderAnt from './FormRenderAnt'
import AntRender from '../form-render/AntRender'
import { JsonFormat } from '../../types'
import styles from './index.module.less'

type PropType = {
  jsonSchema?: Array<JsonFormat>
}

type StateType = {
  visible: boolean,
  formData: any
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
    }, () => {
      // const { jsonSchema } = this.props

      // if (jsonSchema) {
      //   setTimeout(() => {
      //     ReactDom.render(
      //       <AntRender propSchema={jsonSchema} />,
      //       this.ref.current
      //     )
      //   }, 0)
      // }
    })
  }

  showData = () => {
    const { formData } = this.state
    console.log('form data:', formData)
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
            onChange={this.onChange}
          />
        </Modal>
      </div>
    )
  }
}

export default Preview
