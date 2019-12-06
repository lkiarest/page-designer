import React from 'react'
import { inject, observer } from 'mobx-react'
import { Store } from '../../../store'
import DataElement from './DataElement'
import dataList from './dataList'
import ElementControl from '../../../core/element/ElementControl'

@inject('rootStore')
@observer
class DataPanel extends React.Component<{
  rootStore?: Store
}> {
  render() {
    const dataElement = new DataElement({
      type: 'style-panel',
      children: dataList()
    })

    return (
      <ElementControl
        element={dataElement}
      />
    )
  }
}

export default DataPanel
