import { Col } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers, canBeDroped, canDropTo } from '../../core/decorator'

@staticMembers({
  displayName: '列(栅格)',
  category: ElementCategory.LAYOUT,
  type: 'col',
  icon: 'column-height',
  props: [{
    name: 'span',
    type: 'input',
    props: {
      label: '列宽'
    },
    default: 11,
    dataType: 'number'
  }, {
    name: 'offset',
    type: 'input',
    props: {
      label: '偏移'
    },
    default: 1,
    dataType: 'number'
  }]
})
@canDropTo('row') // 列控件只可被拖入行控件内
@canBeDroped('!col') // 不可拖入其他列控件
export default class extends Element {
  _getComponent() {
    return Col
  }
}
