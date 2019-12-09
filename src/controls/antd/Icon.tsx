
import { Icon } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers, sfcToCls/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '图标',
  category: ElementCategory.BASIC,
  type: 'Icon',
  icon: 'file-image',
  inline: true, // 行内元素
  props: {
    type: 'object',
    properties: {
      type: {
        title: '图标名称',
        type: 'string',
        default: 'smile'
      },
      spin: {
        title: '旋转动画',
        type: 'boolean',
        default: false,
        'ui:widget': 'switch'
      },
      rotate: {
        title: '旋转角度',
        type: 'number',
        default: 0
      }
    }
  }
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return sfcToCls(Icon)
  }
}
