import React from 'react'

import { LIB_NAME } from '../constants'
import { getByPath, getOptionSlug } from '../util'

const Selection = ({ option, props, state, methods }) => {
  if (option && props.selectionRenderer) {
    return props.selectionRenderer({ option, props, state, methods })
  }

  const slug = getOptionSlug(option, props)
  return (
    <span
      role='listitem'
      disabled={props.disabled}
      className={`${LIB_NAME}-selection${props.direction === 'rtl' ? ` ${LIB_NAME}-selection-rtl` : ''}`}
      data-testid={`${LIB_NAME}-${props.name}-Selection-${slug}`}
    >
      <span className={`${LIB_NAME}-selection-label`} data-testid={`${LIB_NAME}-${props.name}-Selection-label-${slug}`}>
        {getByPath(option, props.labelField)}
      </span>
      <span
        className={`${LIB_NAME}-selection-remove`}
        data-testid={`${LIB_NAME}-${props.name}-Selection-remove-${slug}`}
        onClick={(event) => methods.removeOption(event, option, props.closeOnSelect)}
      >
        &times;
      </span>
    </span>
  )
}

export default Selection
