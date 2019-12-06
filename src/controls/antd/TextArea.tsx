// import React from 'react'
import { Input } from 'antd'
import Element from '../../core/element/Element'
import { formControl } from './Form'
import { staticMembers } from '../../core/decorator'
import ElementCategory from '../../core/element/ElementCategory'

const { TextArea } = Input

@staticMembers({
  displayName: '文本域',
  category: ElementCategory.FORM,
  type: 'textarea',
  icon: 'edit',
  props: [{
    name: 'label',
    type: 'input',
    props: {
      label: '标签文字',
    },
    default: '文本域',
  }, {
    name: 'placeholder',
    type: 'input',
    props: {
      label: '提示文字'
    },
    default: '请输入',
  }]
})
class InnerCls extends Element {
  @formControl
  _getComponent() {
    return TextArea
  }
}

export default InnerCls
