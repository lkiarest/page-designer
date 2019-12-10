import { DatePicker } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

@staticMembers({
  displayName: '日期选择',
  category: ElementCategory.FORM,
  type: 'date_picker',
  icon: 'calendar',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签',
        type: 'string',
        default: '日期选择'
      }
    }
  },
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return DatePicker
  }
}
