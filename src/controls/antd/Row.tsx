import { Row } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { canBeDroped, staticMembers, canDropTo } from '../../core/decorator'

@staticMembers({
  displayName: '行(栅格)',
  category: ElementCategory.LAYOUT,
  type: 'row',
  icon: 'column-width',
  props: {
    type: 'object',
    properties: {
      align: {
        title: '垂直对齐',
        type: 'string',
        enum: ['top', 'middle', 'bottom'],
        enumNames: ['顶部对齐', '居中对齐', '底部对齐'],
        default: 'middle'
      }
    }
  },
})
@canBeDroped('col')
@canDropTo('!row') // 不能直接拖到另一个行控件内
class InnerCls extends Element {
  _getComponent() {
    return Row
  }
}

export default InnerCls
