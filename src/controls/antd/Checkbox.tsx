import React from 'react'
import { Checkbox } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

const CheckboxGroup = Checkbox.Group;

@staticMembers({
  displayName: '多选框',
  category: ElementCategory.FORM,
  type: 'checkbox',
  icon: 'check-square',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签',
        type: 'string',
        default: '多选框'
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
  }
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return function (props: any) {
      // console.log('checkbox props', props)
      const { options = [], ...innerProps } = props

      return (
        <CheckboxGroup
          options={options}
          { ...innerProps }
        />
      )
    }
  }
}
