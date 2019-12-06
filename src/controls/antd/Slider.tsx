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
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'label',
    type: 'input',
    props: {
      label: '标签'
    },
    default: '滑动输入条',
    dataType: 'string'
  }, {
    name: 'min',
    type: 'input',
    props: {
      label: '最小值'
    },
    default: 0,
    dataType: 'number'
  }, {
    name: 'max',
    type: 'input',
    props: {
      label: '最大值'
    },
    default: 100,
    dataType: 'number'
  }, {
    name: 'step',
    type: 'input',
    props: {
      label: '步长'
    },
    default: 100,
    dataType: 'number'
  }, {
    name: 'range',
    type: 'switch',
    props: {
      label: '范围选择'
    },
    default: false,
    dataType: 'boolean'
  }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return Slider
  }
}
