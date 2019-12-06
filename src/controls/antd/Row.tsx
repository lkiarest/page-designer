import { Row } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { canBeDroped, staticMembers, canDropTo } from '../../core/decorator'

@staticMembers({
  displayName: '行(栅格)',
  category: ElementCategory.LAYOUT,
  type: 'row',
  icon: 'column-width',
  props: [{
    name: 'align',
    type: 'select',
    props: {
      label: '垂直对齐',
      options: [
        { label: '顶部对齐', value: 'top' },
        { label: '居中对齐', value: 'middle' },
        { label: '底部对齐', value: 'bottom' }]
    },
    default: 'middle',
    dataType: 'string'
  }]
})
@canBeDroped('col')
@canDropTo('!row') // 不能直接拖到另一个行控件内
class InnerCls extends Element {
  _getComponent() {
    return Row
  }
}

export default InnerCls
