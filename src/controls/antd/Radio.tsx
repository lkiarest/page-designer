import React from 'react'
import { Radio } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

@staticMembers({
  displayName: '单选框',
  category: ElementCategory.FORM,
  type: 'radio',
  icon: 'tablet',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签文字',
        type: 'string',
        default: '单选框'
      },
      buttonStyle: {
        title: '按钮风格',
        type: 'string',
        enum: ['', 'solid', 'outline'],
        enumNames: ['None', 'Solid', 'Outline'],
        default: '',
        'ui:widget': 'radio',
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
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return function(props: any) {
      const { options = [], ...other } = props

      return props.buttonStyle ? (
        <Radio.Group {...other} >
          {
            options.map((item: any) => (
              <Radio.Button value={item.value} key={item.value}>{item.label}</Radio.Button>
            ))
          }
        </Radio.Group>
      ) : (
        <Radio.Group {...props} />
      )
    }
  }
}
