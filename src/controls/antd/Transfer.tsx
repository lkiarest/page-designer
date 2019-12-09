import { Transfer } from 'antd'
import Element from '../../core/element/Element'
import { staticMembers } from '../../core/decorator'
import { formControl } from './Form'
import ElementCategory from '../../core/element/ElementCategory'

// 默认数据
const mockData = []
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  })
}

@staticMembers({
  displayName: '穿梭框',
  category: ElementCategory.FORM,
  type: 'transfer',
  icon: 'cluster',
  props: [{
    name: 'label',
    type: 'input',
    props: {
      label: '标签文字',
    },
    default: '穿梭框',
  }, {
    name: 'dataSource',
    type: 'json',
    props: {
      label: '数据源'
    },
    default: mockData,
    dataType: 'array'
  }, {
    name: 'leftLabel',
    type: 'input',
    props: {
      label: '左侧标签',
    },
    default: '未选',
  }, {
    name: 'rightLabel',
    type: 'input',
    props: {
      label: '右侧标签',
    },
    default: '已选',
  }]
})
class InnerCls extends Element {
  prepareProps(props: any): any {
    const { leftLabel, rightLabel, value, ...innerProps } = props
    return {
      ...innerProps,
      titles: [ leftLabel, rightLabel ],
      targetKeys: value,
    }
  }

  @formControl
  _getComponent() {
    return Transfer
  }
}

export default InnerCls
