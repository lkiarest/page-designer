import React from 'react'
import FlipMove from 'react-flip-move'

/**
 * simply enjoy react-flip-move
 */
class Animation extends React.Component {
  render() {
    // wrapperless mode of FlipMove
    return (
      <FlipMove typeName={null} duration={100}>
        {
          this.props.children
        }
      </FlipMove>
    )
  }
}

export default Animation
