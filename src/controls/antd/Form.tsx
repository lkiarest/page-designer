import React, { Component, SFC } from 'react'
import { Form } from 'antd'
import Schema from 'async-validator'
import Element from "../../core/element/Element"
import { canBeDroped, staticMembers } from '../../core/decorator'
import ElementCategory from '../../core/element/ElementCategory'
import { ElementConsumer } from '../../core/element/ElementContext'
import { RuleItem, VALIDATE_STATUS } from '../../types'
import { parseValue } from '../../core/utils'
import { number } from 'prop-types'

type ControlProps = {
  // rootStore: Store,
  name: string,
  label: string,
  dataType: string,
  value?: any,
  className?: string,
  onClick?: Function
}

type FormItemProps = {
  name: string,
  label: string,
  className: string,
  children: any,
  validateRules?: RuleItem
}

/**
 * 高阶组件装饰器，封装表单控件统一行为：
 * - 注入 store
 * - 监听 change 事件
 */
export function formControl(target: Object, name: string, descriptor: TypedPropertyDescriptor<any>) {
  const oldValue = descriptor.value
  descriptor.value = function() {
    const retComp = oldValue!.apply(this) as React.ComponentType
    return wrapComponent(retComp)
  }

  return descriptor
}

class FormItem extends React.Component<FormItemProps, {
  validateStatus: VALIDATE_STATUS,
  help: string
}> {
  constructor(props: FormItemProps) {
    super(props)
    this.state = {
      validateStatus: '',
      help: ''
    }
  }

  onBlur = (e: any) => {
    if (e && e.target && e.target.value !== undefined) {
      const result = this.validate(e.target.value)
      if (result) {
        this.setState(result)
      } else {
        this.setState({
          validateStatus: '',
          help: ''
        })
      }
    }
  }

  validate(value?: any): any {
    const { name, validateRules } = this.props
    if (value === undefined || !validateRules) {
      return null
    }

    const rules = validateRules[name]
    if (!rules || rules.length === 0) {
      return null
    }

    if (rules[0].type) {
      value = parseValue(value, rules[0].type)
    }

    const validator = new Schema({
      [name]: rules
    })
    let result = null
    validator.validate({[name]: value}, {
      first: true, // when the first validation rule generates an error stop processed
    }, (errors) => {
      if (errors && errors.length > 0) {
        result = {
          validateStatus: 'error',
          help: errors[0].message
        }
      }
    })

    return result
  }

  render() {
    const { label, className, children } = this.props
    const { validateStatus, help } = this.state

    const childrenWrapped = children && React.cloneElement(children, {
      ...children.props,
      onBlur: this.onBlur,
    })

    const validateProps = validateStatus ? {
      validateStatus, help
    } : null

    return (
      <Form.Item
        label={label}
        colon={false}
        className={className}
        {...validateProps}
      >
        {
          childrenWrapped
        }
      </Form.Item>
    )
  }
}

export function wrapComponent(Comp: typeof Component | SFC): typeof React.Component {
  // @inject('rootStore')
  // @observer
  class RenderCls extends React.Component<ControlProps, {
    needValidate: boolean
  }> {
    onChange = (e: any, name: string, callback?: Function) => {
      const { dataType } = this.props
      const value = e && e.target ? e.target.value : e
      callback && callback(parseValue(value, dataType), name)
    }

    render() {
      const { name, label, className, dataType, value: transferValue, ...props } = this.props

      return (
        <ElementConsumer>
          {
            ({ value, validateRules, onChange }) => (
              <FormItem
                name={name}
                label={label}
                className={className || ''}
                validateRules={validateRules}
              >
                <Comp
                  {...props}
                  name={ name }
                  value={value ? value[name] : transferValue}
                  onChange={(e: React.ChangeEvent) => {
                    this.onChange!(e, name, onChange)
                  }}
                />
              </FormItem>
            )
          }
        </ElementConsumer>
      )
    }
  }

  return RenderCls
}

@staticMembers({
  displayName: '表单',
  category: ElementCategory.FORM,
  type: 'form',
  icon: 'form',
  props: {
    type: 'object',
    properties: {
      layout: {
        title: '对齐方式',
        enum: ['horizontal', 'vertical', 'inline'],
        enumNames: ['水平', '垂直', '内联'],
        'ui:widget': 'radio',
        default: 'horizontal',
      },
      labelCol: {
        title: '标签宽度',
        type: 'object',
        properties: {
          span: {
            type: 'number',
            default: 6,
            'ui:options': {
              'addonAfter': '列'
            }
          }
        }
      },
      wrapperCol: {
        title: '内容宽度',
        type: 'object',
        properties: {
          span: {
            type: 'number',
            default: 14,
            'ui:options': {
              'addonAfter': '列'
            }
          }
        }
      }
    }
  },
})
@canBeDroped()
class InnerCls extends Element {
  _getComponent() {
    return class extends React.Component<any> {
      ref: any

      constructor(props: any) {
        super(props)
        this.ref = React.createRef()
      }

      render() {
        return (
          <Form ref={this.ref} {...this.props}>
          </Form>
        )
      }
    }
  }

  prepareProps(props: any) {
    if (props.layout !== 'horizontal') {
      props.labelCol = undefined
      props.wrapperCol = undefined
    }

    return props
  }
}

export default InnerCls
