import React, { ReactElement, MemoExoticComponent } from 'react'
import { Form } from 'antd'
import Element from '../../../core/element/Element'
import IElement, { RenderOption } from '../../../core/element/IElement'
import ElementControl from '../../../core/element/ElementControl'
import { inject, observer } from 'mobx-react'
import { Store } from '../../../store'
import { PROP_NAME_PREFIX } from '../../../configs'

@inject('rootStore')
@observer
class PropComponent extends React.Component<{
  elements?: IElement[],
  renderOptoin?: RenderOption,
  rootStore?: Store
}> {
  render() {
    const renderProps = this.props.renderOptoin || {}
    const { elements, rootStore } = this.props
    const valueData = rootStore!.selectedElement!.props

    // console.log('prop elements', elements)

    return (
      <Form labelCol={{span: 8}} wrapperCol={{span: 16}}>
        {
          elements && elements!.map(item => (
            <ElementControl
              key={item.key}
              element={item}
              renderOption={{
                withBox: false, withLabel: true, props: {
                  name: `${PROP_NAME_PREFIX}${item.name}`,
                  value: valueData && item.name && (item.name in valueData) ? valueData[item.name] : ''
                }
              }}
              {...renderProps}
            />
          ))
        }
      </Form>
    )
  }
}

let MemoedComp: MemoExoticComponent<typeof PropComponent> | null = null

class PropElement extends Element {
  render(renderOption?:RenderOption): ReactElement {
    let Comp = this.getComponent()
    if (!MemoedComp) {
      Comp = React.memo(Comp)
    }

    return (
      <Comp renderOptoin={renderOption} elements={this.children} />
    )
  }

  _getComponent(): typeof PropComponent {
    return PropComponent
  }
}

export default PropElement
