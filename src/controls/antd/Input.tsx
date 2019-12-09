import { Input } from 'antd'
import Element from '../../core/element/Element'
import { formControl } from './Form'
import { staticMembers } from '../../core/decorator'
import ElementCategory from '../../core/element/ElementCategory'

@staticMembers({
  displayName: '输入框',
  category: ElementCategory.FORM,
  type: 'input',
  icon: 'edit',
  checkDataType: true,
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签文字',
        type: 'string',
        default: '输入框',
      },
      type: {
        title: '输入类型',
        type: 'string',
        enum: ['text', 'password'],
        enumNames: ['文本', '密码'],
        default: 'text',
      }
    }
  }
  // props: [{
  //   name: 'label',
  //   type: 'input',
  //   props: {
  //     label: '标签文字',
  //   },
  //   default: '输入框',
  // }, {
  //   name: 'type',
  //   type: 'select',
  //   props: {
  //     label: '输入类型',
  //     options: [
  //       { label: '文本', value: 'text' },
  //       { label: '密码', value: 'password' }
  //     ]
  //   },
  //   default: 'text',
  // }, {
  //   name: 'placeholder',
  //   type: 'input',
  //   props: {
  //     label: '提示文字'
  //   },
  //   default: '请输入',
  // }]
})
class InnerCls extends Element {
  @formControl
  _getComponent() {
    return Input
  }
}

export default InnerCls
