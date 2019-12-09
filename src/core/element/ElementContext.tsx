/**
 * Context for all elements
 */
import React from 'react'
import { RENDER_MODE_DESIGN } from '../../configs'
import { RuleItem } from '../../types'

const ctx = React.createContext<{
  mode: string,
  value?: any,
  validateRules?: RuleItem,
  onChange?: Function
}>({
  mode: RENDER_MODE_DESIGN
})

const { Consumer: ElementConsumer, Provider: ElementProvider } = ctx

export {
  ElementConsumer,
  ElementProvider,
}
