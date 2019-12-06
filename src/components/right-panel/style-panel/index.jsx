import React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import FormRender from 'form-render/lib/antd'
import styleList from './styleList'

const nestedPropNames = ['colors', 'texts', 'margins', 'paddings', 'borders']

const styleConfig = styleList()

const reversedProps = (function() {
  const props = styleConfig.propsSchema.properties

  return nestedPropNames.reduce((ret, item) => {
    Object.keys(props[item].properties).forEach(name => {
      ret[name] = item
    })

    return ret
  }, {})
})()

@inject('rootStore')
@observer
class StylePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {}
    }
  }

  flatternStyle = (style) => {
    const flattern = {}

    for(let name in style) {
      if (nestedPropNames.includes(name)) {
        Object.keys(style[name]).forEach(item => {
          if (style[name][item] === '') {
            flattern[item] = undefined
          } else {
            flattern[item] = style[name][item]
          }
        })
      } else {
        flattern[name] = style[name]
      }
    }

    return flattern
  }

  nestStyle = (style) => {
    const nested = {}
    for (let key in style) {
      const parentKey = reversedProps[key]
      if (parentKey) {
        nested[parentKey] = nested[parentKey] || {}
        nested[parentKey][key] = style[key]
      } else {
        nested[key] = style[key]
      }
    }

    return nested
  }

  onChange = (e) => {
    this.props.rootStore.handleStyleChange(this.flatternStyle(e))
  }

  onValidate = () => {}

  render() {
    const { propsSchema, uiSchema } = styleList()
    const { selectedElement } = this.props.rootStore

    if (!selectedElement) {
      return null
    }

    const elem = toJS(selectedElement)
    const style = this.nestStyle(elem.props ? elem.props.style : {})

    return (
      <FormRender
        propsSchema={propsSchema}
        uiSchema={uiSchema}
        formData={style}
        onChange={this.onChange}
        onValidate={this.onValidate}
        displayType="row"
      />
    )
  }
}

export default StylePanel
