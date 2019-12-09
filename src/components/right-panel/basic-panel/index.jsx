import React from 'react'
import { inject, observer } from 'mobx-react'
import FormRender from 'form-render/lib/antd'

@inject('rootStore')
@observer
class ControlProps extends React.Component {
  onChange = (data) => {
    this.props.rootStore.handlePropsChange(data)
  }

  render() {
    const selectedElement = this.props.rootStore.selectedElement
    const propsSchema = selectedElement.defaultProps()
    if (!propsSchema) {
      return null
    }

    return (
      <FormRender
        propsSchema={propsSchema}
        formData={selectedElement.props}
        onChange={this.onChange}
      />
    )
  }
}

export default ControlProps
