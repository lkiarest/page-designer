import React from 'react'
import { inject, observer } from 'mobx-react'
import { Store } from '../../../store'
import PropElement from './PropElement'

@inject('rootStore')
@observer
class ControlProps extends React.Component<{
  rootStore?: Store
}> {
  render() {
    const selectedElement = this.props.rootStore!.selectedElement

    const propElement = new PropElement({
      type: 'prop',
      children: (selectedElement!.defaultProps() || []).slice().filter(item => item.type !== 'null')
    })

    return propElement.render()
  }
}

export default ControlProps
