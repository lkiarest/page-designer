import React from 'react'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '链接',
  category: ElementCategory.BASIC,
  type: 'link',
  icon: 'link',
  props: {
    type: 'object',
    properties: {
      children: {
        title: '链接文本',
        type: 'string',
        'ui:widget': 'textarea',
        default: '点击跳转'
      },
      href: {
        title: '链接地址',
        type: 'string',
        default: '#'
      },
      target: {
        title: '打开方式',
        type: 'string',
        enum: ['_blank', '_self', '_parent', '_top'],
        default: '_blank',
      }
    }
  },
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return class extends React.Component {
      render() {
      return <a {...this.props}>{this.props.children}</a>
      }
    }
  }
}
