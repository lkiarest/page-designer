import { TreeSelect } from 'antd'
import Element from '../../core/element/Element'
import { staticMembers } from '../../core/decorator'
import { formControl } from './Form'
import ElementCategory from '../../core/element/ElementCategory'

@staticMembers({
  displayName: '树选择',
  category: ElementCategory.FORM,
  type: 'tree-select',
  icon: 'cluster',
  props: [{
    name: 'label',
    type: 'input',
    props: {
      label: '标签文字',
    },
    default: '树选择',
  }, {
    name: 'placeholder',
    type: 'input',
    props: {
      label: '提示文字',
    },
    default: '',
  }, {
    name: 'treeData',
    type: 'json',
    props: {
      label: '选项列表'
    },
    default: [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1',
          },
          {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
      },
    ],
    dataType: 'string'
  }]
})
class InnerCls extends Element {
  @formControl
  _getComponent() {
    return TreeSelect
  }
}

export default InnerCls
