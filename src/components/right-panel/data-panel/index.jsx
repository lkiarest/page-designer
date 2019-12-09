import React from 'react'
import { inject, observer } from 'mobx-react'
import FormRender from 'form-render/lib/antd'
import dataList from './dataList'

const propsSchema = dataList()

@inject('rootStore')
@observer
class DataPanel extends React.Component {
  onChange = (e) => {
    // console.log('on change ')
    this.props.rootStore.handleModelChange(e)
  }

  render() {
    const { rootStore } = this.props
    const selectedElement = rootStore.selectedElement
    const { name, dataType, rules, shouldCheckDataType } = selectedElement

    propsSchema.properties.dataType['ui:hidden'] = !shouldCheckDataType

    const formData = {
      name, dataType, rules
    }

    return (
      <FormRender
        propsSchema={propsSchema}
        formData={formData}
        onChange={this.onChange}
      />
    )
  }
}

export default DataPanel
