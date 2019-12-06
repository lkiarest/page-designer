import React, { ReactElement } from 'react'
import { inject, observer } from 'mobx-react'
import Element from '../../core/element/Element'
import { Store } from '../../store'

@inject('rootStore')
@observer
export default class CurrentControl extends React.Component<{rootStore?: Store}> {
  render(): ReactElement | null {
    const { rootStore } = this.props
    const selectedElement = rootStore!.selectedElement

    return selectedElement ? (
      <div>
        <span>{(selectedElement as Element).ctor().displayName}</span>
        <span>&nbsp;|&nbsp;</span>
        {
          selectedElement.name ? (
            <React.Fragment>
              <span>{selectedElement.name}</span>
              <span>&nbsp;|&nbsp;</span>
            </React.Fragment>
          ) : null
        }
        <span>{selectedElement.key}</span>
      </div>
    ) : null
  }
}
