import { JsonFormat } from '../../types'

type FormRenderProperty = {
  type: string,
  title?: string,
  description?: string,
  format?: string,
  pattern?: string,
  message?: string,
  required?: Array<string>,
  default?: any,
  properties?: {
    [key: string]: FormRenderProperty
  },
  items?: {
    type: string,
    properties?: {
      [key: string]: FormRenderProperty
    },
  },
  'ui:widget'?: string,
  'ui:options'?: any
}

type FormRenderType = {
  type: string,
  properties?: FormRenderProperty,
}

// convert JsonFormat type to propSchema & uiSchema
const transformData = (jsonData: JsonFormat) => {

}
