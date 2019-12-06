
import { Steps } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '步骤条',
  category: ElementCategory.BASIC,
  type: 'steps',
  icon: 'arrow-right',
  // props: [{ // 右侧属性面板中可以编辑的属性列表
  //   name: 'label',
  //   type: 'input',
  //   props: {
  //     label: '标签'
  //   },
  //   default: '输入框',
  //   dataType: 'string'
  // }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return Steps
  }
}
