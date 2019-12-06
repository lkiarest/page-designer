import React from 'react'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'

@staticMembers({
  displayName: '链接',
  category: ElementCategory.BASIC,
  type: 'link',
  icon: 'link',
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'children',
    dataType: 'string',
    type: 'textarea',
    props: {
      label: '链接文本',
      rows: 2,
      props: {
        autoSize: { minRows: 2, maxRows: 6 }
      }
    },
    default: '点击跳转'
  }, { // 右侧属性面板中可以编辑的属性列表
    name: 'href',
    dataType: 'string',
    type: 'textarea',
    props: {
      label: '链接地址',
      rows: 4,
      props: {
        autoSize: { minRows: 2, maxRows: 6 }
      }
    },
    default: '#'
  }, {
    name: 'target',
    type: 'select',
    props: {
      label: '打开方式',
      options: [
        { label: '_blank', value: '_blank' },
        { label: '_self', value: '_self' },
        { label: '_parent', value: '_parent' },
        { label: '_top', value: '_top' },
      ]
    },
    default: '_blank',
    dataType: 'string'
  }]
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  _getComponent() {
    return class extends React.Component {
      render() {
        return <a {...this.props}></a>
      }
    }
  }
}
