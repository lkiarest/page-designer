import { Affix } from 'antd'
import Element from '../../core/element/Element'
import ElementCategory from '../../core/element/ElementCategory'
import { staticMembers,/*, canBeDroped, canDropTo*/ 
canBeDroped} from '../../core/decorator'

@staticMembers({
  displayName: '固钉',
  category: ElementCategory.BASIC,
  type: 'affix',
  icon: 'heat-map',
  props: [{ // 右侧属性面板中可以编辑的属性列表
    name: 'offsetTop',
    type: 'input',
    props: {
      label: '顶部偏移'
    },
    default: 10,
    dataType: 'number'
  }, { // 右侧属性面板中可以编辑的属性列表
    name: 'offsetBottom',
    type: 'input',
    props: {
      label: '底部偏移'
    },
    default: 10,
    dataType: 'number'
  }]
})
@canBeDroped()
export default class extends Element {
  _getComponent() {
    return Affix
  }
}
