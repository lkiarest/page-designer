import React from 'react'
import { JsonFormat } from '../../types'
import factory from '../../core/ElementFactory'
import ElementControl from '../../core/element/ElementControl'
import { ElementProvider } from '../../core/element/ElementContext'
import { RENDER_MODE_PREVIEW } from '../../configs'
import IElement from '../../core/element/IElement'

type FormRenderProps = {
  propSchema: Array<JsonFormat>,
  formData?: {[key: string]: any},
  rules?: {[key: string]: any},
  onChange: Function,
}

/**
 * ant-design based form renderer
 */
class FormRender extends React.Component<FormRenderProps> {
  elements?: Array<IElement> | null

  constructor(props: FormRenderProps) {
    super(props)
    this.elements = null
  }

  onChange = (e: any, name: string) => {
    const { formData, onChange: onDataChange } = this.props
    const value = e.target ? e.target.value : e
    onDataChange({ ...formData, [name]: value })
  }

  render() {
    const { propSchema, formData, rules } = this.props
    if (!propSchema) {
      return null
    }

    if (!this.elements) {
      this.elements = propSchema.map(item => factory.createElement(item))
    }
    // console.log('ant render:', formData)

    return (
      <ElementProvider
        value={{
          value: formData,
          mode: RENDER_MODE_PREVIEW,
          validateRules: rules,
          onChange: this.onChange
        }}
      >
        <div>
          {
            this.elements && this.elements.map(ele => (
              <ElementControl
                key={ele.key}
                element={ele}
                renderOption={{ withBox: false }}
              />
            ))
          }
        </div>
      </ElementProvider>
    )
  }
}

export default FormRender
