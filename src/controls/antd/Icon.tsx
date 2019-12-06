
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
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'type',
    type: 'input',
    props: {
      label: '图标名称'
    },
    default: 'smile',
    dataType: 'string'
  }, {
    name: 'spin',
    type: 'switch',
    props: {
      label: '旋转动画'
    },
    default: false,
    dataType: 'boolean'
  }, {
    name: 'rotate',
    type: 'input',
    props: {
      label: '旋转角度'
    },
    default: 0,
    dataType: 'number'
  }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return sfcToCls(Icon)
  }
}
