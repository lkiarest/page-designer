import React from 'react'
import { Select } from 'antd'
import Element from '../../core/element/Element'
import { staticMembers } from '../../core/decorator'
import { formControl } from './Form'
import ElementCategory from '../../core/element/ElementCategory'

const { Option } = Select

@staticMembers({
  displayName: '下拉选择',
  category: ElementCategory.FORM,
  type: 'select',
  icon: 'select',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签文字',
        type: 'string',
        default: '下拉框'
      },
      options: {
        title: '选项列表',
        type: 'array',
        "ui:options": {
          "foldable": true
        },
        items: {
          type: 'object',
          properties: {
            label: {
              type: 'string',
              title: '选项说明'
            },
            value: {
              type: 'string',
              title: '选项值',
            }
          },
        },
      }
    }
  },
})
class InnerCls extends Element {
  @formControl
  _getComponent() {
    return function(props: any) {
      const { options = [], ...innerProps} = props

      return (
        <Select {...innerProps}>
          {
            options.map((item: any) => (
              <Option key={item.value} value={item.value}>{item.label}</Option>
            ))
          }
        </Select>
      )
    }
  }
}

export default InnerCls
