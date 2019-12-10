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
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签',
        type: 'string',
        default: '评分'
      },
      count: {
        title: '总数',
        type: 'number',
        default: 5
      },
      defaultValue: {
        title: '默认值',
        type: 'number',
        default: 0
      },
      allowHalf: {
        title: '支持半选',
        type: 'boolean',
        default: false
      },
    }
  },
})
export default class extends Element {
  @formControl
  _getComponent() {
    return Rate
  }
}
