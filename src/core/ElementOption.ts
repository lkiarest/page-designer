/**
 * 元素初始化参数
 */
import {OptionType, CommonPropType} from '../types'
import { genKey } from './utils'

export default class ElementOption {
  key?: string
  type: string
  name?:string
  dataType?: string // 允许绑定的数据类型
  rules?: Array<any> // 校验规则
  props?: CommonPropType
  children?: Array<ElementOption>

  constructor(option: OptionType) {
    this.type = option.type
    this.props = option.props
    this.name = option.name
    this.rules = option.rules || []
    this.dataType = option.dataType || 'string' // 默认为字符串类型
    this.children = option.children
    // 若没有定义 key，则随机生成
    this.key = option.key ? option.key : genKey()
  }

  /**
   * 解析外部配置并创建 ElementOption 列表
   */
  static loadOptions(rawOptions: Array<OptionType> | OptionType): Array<ElementOption> {
    if (!rawOptions) {
      return []
    }

    if (!Array.isArray(rawOptions)) {
      rawOptions = [rawOptions]
    }

    return rawOptions.reduce((ret: Array<ElementOption>, option: OptionType) => {
      if (option) {
        const elementOption = new ElementOption({
          key: option.key,
          type: option.type,
          name: option.name,
          props: option.props,
          children: option.children ? ElementOption.loadOptions(option.children) : undefined
        })

        ret.push(elementOption)
      }

      return ret
    }, [])
  }
}
