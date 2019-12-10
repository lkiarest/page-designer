import { Col } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers, canBeDroped, canDropTo } from '../../core/decorator'

@staticMembers({
  displayName: '列(栅格)',
  category: ElementCategory.LAYOUT,
  type: 'col',
  icon: 'column-height',
  props: {
    type: 'object',
    properties: {
      span: {
        title: '列宽',
        type: 'number',
        default: 12
      },
      offset: {
        title: '偏移',
        type: 'number',
        default: 0
      }
    }
  },
})
@canDropTo('row') // 列控件只可被拖入行控件内
@canBeDroped('!col') // 不可拖入其他列控件
export default class extends Element {
  _getComponent() {
    return Col
  }
}
