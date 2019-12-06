/**
 * page preview based on https://alibaba.github.io/form-render/，
 * as form-render doesn't support typescript, use jsx here
 */
import React from "react"
// Ant Design
import FormRender from "form-render/lib/antd"

// Fusion Design
// import "@alifd/next/dist/next.min.css"
// import FormRender from "form-render/lib/fusion"

// propsSchema 使用标准的 JSON Schema 来描述表单结构
const propSchema = {
  type: "object",
  properties: {
    dateDemo: {
      title: "时间",
      type: "string"
    }
  }
}

// uiSchema 可以增强展示类型的丰富性，如时间组件
const uiSchema = {
  dateDemo: {
    "ui:widget": "date"
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      formData: {}
    }
  }

  // 数据变化回调
  onChange = value => {
    this.setState({
      formData: value
    })
  }

  // 数据格式校验回调
  onValidate = list => {
    console.log(list)
  }

  render() {
    const { formData } = this.state
    return (
      <FormRender
        propsSchema={propSchema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={this.onChange}
        onValidate={this.onValidate}
      />
    )
  }
}

export default App
