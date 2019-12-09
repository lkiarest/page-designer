import React from "react"
import { toJS } from 'mobx'
import { inject, observer } from "mobx-react"
// import ReactDOM from "react-dom"
import ElementBox from "../element-box/ElementBox"
import LeafBox from '../element-box/LeafBox'
import { Store } from "../../store"
import IElement, { RenderOption } from "./IElement"
import Animation from '../../components/animation'
import { setItem } from './RenderCache'
import styles from './element.module.less'

type ElementControlProps = {
  rootStore?: Store,
  element: IElement,
  renderOption?: RenderOption,
  // forwardedRef?: any,
}

@inject('rootStore')
@observer
class ElementControl extends React.Component<ElementControlProps, { display: string | null }> {
  ref: any
  componentRef: any

  constructor(props: ElementControlProps) {
    super(props)

    this.state = {
      display: ''
    }

    this.ref = React.createRef()
    // this.componentRef = React.createRef()
  }

  componentDidMount() {
    setItem(this.props.element.key, this.ref)
  }

  componentDidUpdate() {
    setItem(this.props.element.key, this.ref)
  }

  render() {
    const { element, renderOption = {}, rootStore, ...props } = this.props
    if (element.type === 'null') {
      return null
    }

    const { style: elementStyle, ...elementProps } = element.props || {}

    const Comp = element.getComponent()
    const mergedProps = {
      ...props,
      ...elementProps,
      ...renderOption.props,
    }

    if (elementStyle) {
      mergedProps.style = {
        ...mergedProps.style,
        ...toJS(elementStyle)
      }
    }

    if (!mergedProps.name && element.name) {
      mergedProps.name = element.name
    }

    if (element.dataType) {
      mergedProps.dataType = element.dataType
    }

    const  preparedProps = element.prepareProps(mergedProps)

    const dropInBox = renderOption.withBox && element.canBeDroped()
    const preparedStyle = preparedProps.style || {}

    preparedProps.style = {
      ...preparedStyle,
      position: 'relative',
      padding: preparedStyle.padding || (dropInBox ? '8px' : undefined),
      minHeight: preparedStyle.minWidth || (renderOption.withBox && '12px'),
    }

    // 非容器元素
    if (!element.canBeDroped()) {
      // 与容器元素的渲染有区别
      return renderOption.withBox ? (
        <LeafBox
          element={element}
          key={element.key}
          ref={this.ref}
        >
          <Comp {...preparedProps} />
        </LeafBox>
      ) : <Comp {...preparedProps} key={element.key} />
    }

    return renderOption.withBox ? (
      <Comp {...preparedProps} key={element.key}>
        <ElementBox
          element={element}
          className={styles.box_in_container}
          ref={this.ref}
        />
        <Animation>
        {
          element.children && element.children.map((item: IElement) => (
            <ElementControl key={item.key} element={item} renderOption={renderOption} />
          ))
        }
        </Animation>
      </Comp>
    ) : (
      <Comp {...preparedProps} key={element.key}>
        {/* <Animation> */}
        {
          element.children && element.children.map((item: IElement) => (
            <ElementControl key={item.key} element={item} renderOption={renderOption} />
          ))
        }
        {/* </Animation> */}
      </Comp>
    )
  }
}

export default ElementControl
