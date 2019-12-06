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
  props: [{
    name: 'label',
    type: 'input',
    props: {
      label: '标签文字',
    },
    default: '单选框',
  }, { // 右侧属性面板中可以编辑的属性列表
    name: 'options',
    type: 'list',
    props: {
      label: '选项列表'
    },
    default: [
      { value: 0, label: '选项一'},
      { value: 1, label: '选项二'},
      { value: 2, label: '选项三'},
    ],
    dataType: 'string'
  }, {
    name: 'buttonStyle',
    type: 'radio',
    props: {
      label: '按钮风格',
      options: [
        { value: '', label: '无'},
        { value: 'solid', label: 'Solid'},
        { value: 'outline', label: 'Outline'},
      ],
      buttonStyle: 'solid',
    },
    default: '',
  }]
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
