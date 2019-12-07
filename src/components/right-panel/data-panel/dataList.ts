/**
 * define data model properties
 */
export default () => ({
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '模型名称',
    },
    dataType: {
      type: 'string',
      title: '数据类型',
      enum: [
        'string', 'number', 'boolean', 'method', 'regexp', 'integer', 'float', 'array', 'object',
        'enum', 'date', 'url', 'hex', 'email', 'any',
      ]
    },
    rules: {
      type: 'array',
      title: '校验规则',
      description: '表单字段校验',
      items: {
        type: 'object',
        properties: {
          name: {
            title: '规则',
            type: 'string',
            enum: ['required', 'max', 'min', 'pattern'],
            enumNames: ['是否必须', '最大长度', '最小长度', '自定义']
          },
          required: {
            title: '',
            type: 'boolean',
            'ui:widget': 'switch',
            'ui:hidden': (value: boolean, rootValue: any, formData: object) => rootValue.name !== 'required'
          },
          max: {
            title: '长度值',
            type: 'string',
            'ui:hidden': (value: boolean, rootValue: any, formData: object) => rootValue.name !== 'max'
          },
          min: {
            title: '长度值',
            type: 'string',
            'ui:hidden': (value: boolean, rootValue: any, formData: object) => rootValue.name !== 'min'
          },
          pattern: {
            title: '正则表达式',
            type: 'string',
            'ui:hidden': (value: boolean, rootValue: any, formData: object) => rootValue.name !== 'pattern'
          },
          message: {
            title: '错误提示',
            type: 'string'
          }
        }
      },
      "ui:options": {
        "foldable": true
      },
    }
  }
})
