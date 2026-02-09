import React from 'react'

import { LIB_NAME } from '../constants'

const Loading = ({ props }) =>
  props.loadingRenderer
    ? (
        props.loadingRenderer({ props })
      )
    : (
      <div className={`${LIB_NAME}-loading`} data-testid={`${LIB_NAME}-${props.name}-Loading`} />
      )

export default Loading
