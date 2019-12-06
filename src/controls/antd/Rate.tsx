import { Rate } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

@staticMembers({
  displayName: '评分',
  category: ElementCategory.FORM,
  type: 'rate',
  icon: 'star',
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'label',
    type: 'input',
    props: {
      label: '标签'
    },
    default: '评分',
    dataType: 'string'
  }, {
    name: 'count',
    type: 'input',
    props: {
      label: '总数'
    },
    default: 5,
    dataType: 'number'
  }, {
    name: 'defaultValue',
    type: 'input',
    props: {
      label: '默认值'
    },
    default: 0,
    dataType: 'number'
  }, {
    name: 'allowHalf',
    type: 'switch',
    props: {
      label: '支持半选'
    },
    default: false,
    dataType: 'boolean'
  }]
})
export default class extends Element {
  @formControl
  _getComponent() {
    return Rate
  }
}
