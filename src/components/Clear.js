import React from 'react'

import { LIB_NAME } from '../constants'

const Clear = ({ props, state, methods }) =>
  props.clearRenderer
    ? (
        props.clearRenderer({ props, state, methods })
      )
    : (
      <div
        className={`${LIB_NAME}-clear`}
        data-testid={`${LIB_NAME}-${props.name}-Clear`}
        tabIndex='-1'
        onClick={(event) => { event.stopPropagation(); methods.clearAll() }}
        onKeyDown={(event) => { event.stopPropagation(); methods.clearAll() }}
      >
        &times;
      </div>
      )

export default Clear
