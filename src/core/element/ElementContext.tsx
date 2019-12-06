/**
 * Context for all elements
 */
import React from 'react'
import { RENDER_MODE_DESIGN } from '../../configs'

const ctx = React.createContext<{
  mode: string,
  value?: any,
  onChange?: Function
}>({
  mode: RENDER_MODE_DESIGN
})

const { Consumer: ElementConsumer, Provider: ElementProvider } = ctx

export {
  ElementConsumer,
  ElementProvider,
}
