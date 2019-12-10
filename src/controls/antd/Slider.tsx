import { Slider } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

@staticMembers({
  displayName: '滑动输入条',
  category: ElementCategory.FORM,
  type: 'slider',
  icon: 'column-width',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签',
        type: 'string',
        default: '滑动输入条'
      },
      min: {
        title: '最小值',
        type: 'number',
        default: 0,
      },
      max: {
        title: '最大值',
        type: 'number',
        default: 100,
      },
      step: {
        title: '步长',
        type: 'number',
        default: 1,
      },
      // range: {
      //   title: '范围选择',
      //   type: 'boolean',
      //   default: false,
      //   'ui:widget': 'switch'
      // }
    }
  },
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return Slider
  }
}
