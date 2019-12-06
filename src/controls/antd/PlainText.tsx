import React from 'react'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '普通文本',
  category: ElementCategory.BASIC,
  type: 'plain-text',
  icon: 'file-text',
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'children',
    dataType: 'string',
    type: 'textarea',
    props: {
      label: '文本',
      rows: 4,
      props: {
        autoSize: { minRows: 2, maxRows: 6 }
      }
    },
    default: '普通文本'
  }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return class extends React.Component {
      render() {
        return <p {...this.props}></p>
      }
    }
  }
}
