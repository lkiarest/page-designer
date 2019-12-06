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
  props: [{
    name: 'label',
    type: 'input',
    props: {
      label: '标签文字',
    },
    default: '下拉框',
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
