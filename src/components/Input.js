/* eslint-disable react/jsx-handler-names */
import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'

const handlePlaceHolder = (props, state) => {
  const { addPlaceholder, searchable, placeholder } = props
  const noValues = state.values && state.values.length === 0
  const hasValues = state.values && state.values.length > 0

  if (hasValues && addPlaceholder && searchable) {
    return addPlaceholder
  }

  if (noValues) {
    return placeholder
  }

  if (hasValues && !searchable) {
    return ''
  }

  return ''
}

class Input extends Component {
  input = React.createRef()

  componentDidUpdate (prevProps) {
    if (
      this.props.state.dropdown || (prevProps.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown)
    ) {
      this.input.current.focus()
    }

    if (prevProps.state.dropdown !== this.props.state.dropdown && !this.props.state.dropdown) {
      this.input.current.blur()
    }
  }

  onBlur = (event) => {
    const { props, state } = this.props
    if (props.onBlur) {
      props.onBlur()
    }
    if (!state.dropdown) {
      return this.input.current.blur()
    }

    return this.input.current.focus()
  }

  render () {
    const { props, state, methods } = this.props

    if (props.inputRenderer) {
      return props.inputRenderer({ props, state, methods, inputRef: this.input })
    }

    return (
      <input
        ref={this.input}
        className={`${LIB_NAME}-input${props.searchable ? '' : ` ${LIB_NAME}-input-readonly`}`}
        data-testid={`${LIB_NAME}-${props.name}-Input`}
        disabled={props.disabled}
        onBlur={this.onBlur}
        onChange={methods.setSearch}
        onClick={(event) => { event.stopPropagation(); methods.dropDown('open') }}
        onFocus={() => methods.dropDown('open')}
        onKeyDown={methods.handleKeyDown}
        placeholder={handlePlaceHolder(props, state)}
        value={state.search}
      />
    )
  }
}

Input.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  methods: PropTypes.object
}

export default Input
