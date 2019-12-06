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
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'label',
    type: 'input',
    props: {
      label: '标签'
    },
    default: '多选框',
    dataType: 'string'
  }, { // 右侧属性面板中可以编辑的属性列表
    name: 'options',
    type: 'list',
    props: {
      label: '选项列表'
    },
    default: [
      { value: 0, label: '选项一' },
      { value: 1, label: '选项二' },
      { value: 2, label: '选项三' },
    ],
    dataType: 'string'
  }]
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
