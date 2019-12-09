import { Button } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '按钮',
  category: ElementCategory.BASIC,
  type: 'button',
  icon: 'border',
  inline: true, // 行内元素
  props: {
    type: 'object',
    properties: {
      children: {
        title: '按钮文本',
        type: 'string',
        default: '按钮',
      },
      type: {
        title: '风格',
        type: 'string',
        enum: ['primary', 'dashed', 'danger', 'link', 'default'],
        enumNames: ['Primary', 'Dashed', 'Danger', 'Link', 'Default'],
        default: 'default',
      },
      size: {
        title: '尺寸',
        type: 'string',
        enum: ['large', 'default', 'small'],
        enumNames: ['L', 'M', 'S'],
        'ui:widget': 'radio',
        'ui:options': { buttonStyle: 'solid' },
        default: 'default',
      }
    }
  },
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return Button
  }
}
