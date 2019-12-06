import { EventEmitter } from 'events'

const emitter = new EventEmitter()

export default emitter

export const EventTypes = {
  LEAF_LAYOUT: Symbol.for('LEAF_LAYOUT'),
  CONTEXT_MENU: Symbol.for('CONTEXT_MENU'),
}
