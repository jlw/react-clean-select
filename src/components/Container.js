import React from 'react'
import PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'

class Container extends React.Component {
  container = React.createRef()

  render () {
    const { children, props } = this.props

    return (
      <div className={`${LIB_NAME}-container`} data-testid={`${LIB_NAME}-${props.name}-Container`} ref={this.container}>
        {children}
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Container
