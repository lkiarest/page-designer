import React, { ReactElement } from 'react'
import { inject, observer } from 'mobx-react'
import { Form } from 'antd'
import Element from '../../../core/element/Element'
import { RenderOption } from '../../../core/element/IElement'
import { Store } from '../../../store'
import { DATA_NAME_PREFIX } from '../../../configs'

@inject('rootStore')
@observer
class DataComponent extends React.Component<{
  children?: Array<ReactElement>,
  renderOptoin?: RenderOption,
  rootStore?: Store
}> {
  render() {
    const { rootStore } = this.props
    const selectedElement = rootStore!.selectedElement
    const name = selectedElement.name || ''

    const { children } = this.props

    return (
      <Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
        {
          children!.map(child => React.cloneElement(child, {
            name: `${DATA_NAME_PREFIX}${child.props.element.name}`,
            value: name
          }))
        }
      </Form>
    )
  }
}

class DataElement extends Element {
  _getComponent(): typeof DataComponent {
    return DataComponent
  }

  canBeDroped() {
    return true
  }
}

export default DataElement
