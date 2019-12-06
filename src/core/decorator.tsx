import { StaticMemberDeco } from "../types"
import IElement from "./element/IElement"
import React from "react"

/**
 * 为 class 增加静态成员
 */
export const staticMembers = (members: StaticMemberDeco) => {
  return function(target: any) {
    for (let key in members) {
      target[key] = (members as any)[key]
    }
  }
}

type DropToType = string | Array<string>

/**
 * 指定可以拖入的其他组件的类型，参数为空表示允许任何类型
 * @param source 控件类型，多个类型可用数组表示，字符串以 ! 开头表示排除此控件类型
 */
export const canBeDroped = (source?: DropToType) => {
  const checkTypes: Array<string> = source ? (Array.isArray(source) ? source : [source]) : []

  return function(target: any) {
    target.prototype.canBeDroped = function(element: IElement) {
      if (!element) { // 若参数为空，默认返回 true
        return true
      }

      const targetType = element.ctor().type

      return checkTypes.every(item => {
        if (item.charAt(0) === '!') {
          return item.substring(1) !== targetType
        } else {
          return item === targetType
        }
      })
    }
  }
}

/**
 * 限制拖动后可放置的容器类型，参数为空表示允许任何类型
 * @param container 控件类型，多个类型可用数组表示，字符串以 ! 开头表示排除此控件类型
 */
export const canDropTo = (container?: DropToType) => {
  const checkTypes: Array<string> = container ? (Array.isArray(container) ? container : [container]) : []

  return function(target: any) {
    /**
     * 判断是否可以拖放到目标容器内
     */
    target.prototype.canDropTo = function(element: IElement) {
      const targetType = element.ctor().type

      return checkTypes.every(item => {
        if (item.charAt(0) === '!') {
          return item.substring(1) !== targetType
        } else {
          return item === targetType
        }
      })
    }
  }
}

/**
 * 部分组件是函数式，无法统一处理 ref,使用此修饰器将其转为 class 组件
 */
export const sfcToCls = (Target: React.ComponentType) => {
  return class extends React.PureComponent {
    render() {
      const { props } = this
      return <Target {...props} />
    }
  }
}
