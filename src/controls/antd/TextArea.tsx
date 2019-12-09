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
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签文字',
        type: 'string',
        default: '文本域'
      },
      placeholder: {
        title: '提示文字',
        type: 'string',
        default: '请输入',
      }
    }
  },
})
class InnerCls extends Element {
  @formControl
  _getComponent() {
    return TextArea
  }
}

export default InnerCls
