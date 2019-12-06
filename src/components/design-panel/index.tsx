import React, { ReactElement } from 'react'
import { observer,inject } from "mobx-react"
import { Store } from '../../store'
import ElementControl from '../../core/element/ElementControl'
import { ElementProvider } from '../../core/element/ElementContext'
import ContextMenu from './contextmenu'
import { RENDER_MODE_DESIGN } from '../../configs'
import styles from './index.module.less'

interface OwnProps {
  // elements: Array<ElementOption>,
  rootStore?: Store
}

@inject('rootStore')
@observer
class DesignPanel extends React.Component<OwnProps> {
  constructor(props: OwnProps) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(e: React.ChangeEvent, name: string) {
    const { rootStore } = this.props
    rootStore && rootStore.handleFormChangeEvent(e, name)
  }

  render(): ReactElement {
    const { rootStore } = this.props
    const { placeholder } = rootStore!
    // const elements = rootStore!.elements

    const page = rootStore!.rootElement

    const placeholderStyle = placeholder ? {
      width: `${placeholder.position.width}px`,
      height: `${placeholder.position.height}px`,
      transform: `translate3d(${placeholder.position.x}px, ${placeholder.position.y}px, 0)`
    } : {
      opacity: 0
    }

    return (
      <div className={styles.panel}>
        <ElementProvider value={{ mode: RENDER_MODE_DESIGN, onChange: this.onChange }}>
          <ElementControl
            element={page}
            renderOption={{withBox: true, withLabel: true}}
          />
          <div className={styles.placeholder} style={placeholderStyle}></div>
          <ContextMenu />
        </ElementProvider>
      </div>
    )
  }
}

export default DesignPanel
