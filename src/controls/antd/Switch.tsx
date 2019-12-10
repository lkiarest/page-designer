import React from 'react'
import { Switch } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers/*, canBeDroped, canDropTo*/ } from '../../core/decorator'
import { formControl } from './Form'

@staticMembers({
  displayName: '开关',
  category: ElementCategory.FORM,
  type: 'switch',
  icon: 'switcher',
  props: {
    type: 'object',
    properties: {
      label: {
        title: '标签',
        type: 'string',
        default: '开关'
      },
      size: {
        title: '尺寸',
        enum: ['default', 'small'],
        enumNames: ['M', 'S'],
        default: 'default',
        'ui:options': {
          buttonStyle: 'solid'
        }
      }
    }
  },
})
// @canDropTo('row') // 指定可以将此控件拖入的其他控件名称
// @canBeDroped('!col') // 指定不可拖入此控件的控件名称
export default class extends Element {
  @formControl
  _getComponent() {
    return class extends React.Component<any> {
      render() {
        const { value, ...other } = this.props
        const props = { ...other, checked: !!value }

        return (
          <Switch {...props} />
        )
      }
    }
  }

  // prepareProps(props: any) {
  //   const { value, ...other } = props
  //   return { ...other, checked: !!value }
  // }
}
