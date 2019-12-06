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
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'label',
    type: 'input',
    props: {
      label: '标签'
    },
    default: '开关',
    dataType: 'string'
  }, {
    name: 'size',
    type: 'radio',
    props: {
      label: '尺寸',
      options: [
        { label: 'M', value: 'default' },
        { label: 'S', value: 'small' }
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
