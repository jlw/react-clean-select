/* eslint-disable react/jsx-handler-names */
import React from 'react'
import * as PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'

const Input = ({ props, state, methods, inputRef }) => {
  if (props.inputRenderer) {
    return props.inputRenderer({ props, state, methods, inputRef })
  }

  const getPlaceHolder = () => {
    const { addPlaceholder, searchable, placeholder } = props
    const hasValues = state.values && state.values.length > 0

    if (!hasValues) {
      return placeholder
    } else if (hasValues && addPlaceholder && searchable) {
      return addPlaceholder
    }

    return ''
  }

  return (
    <input
      ref={inputRef}
      className={`${LIB_NAME}-input${props.searchable ? '' : ` ${LIB_NAME}-input-readonly`}`}
      data-testid={`${LIB_NAME}-${props.name}-Input`}
      disabled={props.disabled}
      onChange={methods.setSearch}
      onClick={(event) => { event.stopPropagation(); methods.dropDown('open', true) }}
      onFocus={() => methods.dropDown('open', true)}
      onKeyDown={methods.handleKeyDown}
      placeholder={getPlaceHolder()}
      value={state.search}
    />
  )
}

Input.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  methods: PropTypes.object,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
}

export default Input
