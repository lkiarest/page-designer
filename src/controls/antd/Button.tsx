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
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'children',
    type: 'input',
    props: {
      label: '按钮文本'
    },
    default: '按钮',
    dataType: 'string'
  }, {
    name: 'type',
    type: 'select',
    props: {
      label: '风格',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Danger', value: 'danger' },
        { label: 'Link', value: 'link' },
        { label: 'Default', value: 'default' },
      ]
    },
    default: 'default',
    dataType: 'string'
  }, {
    name: 'size',
    type: 'radio',
    props: {
      label: '尺寸',
      options: [
        { label: 'L', value: 'large'},
        { label: 'M', value: 'default'},
        { label: 'S', value: 'small'}
      ],
      buttonStyle: 'solid'
    },
    default: 'default',
    dataType: 'string'
  }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return Button
  }
}
