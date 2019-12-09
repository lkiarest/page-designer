import React from 'react'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '普通文本',
  category: ElementCategory.BASIC,
  type: 'plain-text',
  icon: 'file-text',
  props: {
    type: 'object',
    properties: {
      children: {
        title: '文本',
        type: 'string',
        'ui:widget': 'textarea',
        default: '普通文本'
      },
    }
  },
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
