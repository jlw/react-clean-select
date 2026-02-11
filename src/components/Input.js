/* eslint-disable react/jsx-handler-names */
import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'
import { valueExistInSelected } from '../util'

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
      this.props.state.dropdown || (prevProps.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown) ||
      this.props.props.autoFocus
    ) {
      this.input.current.focus()
    }

    if (prevProps.state.dropdown !== this.props.state.dropdown && !this.props.state.dropdown) {
      this.input.current.blur()
    }
  }

  onBlur = (event) => {
    event.stopPropagation()
    if (!this.props.state.dropdown) {
      return this.input.current.blur()
    }

    return this.input.current.focus()
  }

  handleKeyDown = (event) => {
    const { props, state, methods } = this.props

    if (
      props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(state.search, [...state.values, ...props.options], this.props) &&
      state.search &&
      state.cursor === null
    ) {
      methods.createNew(state.search)
    } else {
      methods.handleKeyDown(event)
    }
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
        onClick={() => methods.dropDown('open')}
        onFocus={(event) => event.stopPropagation()}
        onKeyDown={this.handleKeyDown}
        placeholder={handlePlaceHolder(props, state)}
        tabIndex='-1'
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
