import React from 'react'

import { LIB_NAME } from '../constants'

const NoData = ({ props, state, methods }) =>
  props.noDataRenderer
    ? (
        props.noDataRenderer({ props, state, methods })
      )
    : (
      <div className={`${LIB_NAME}-no-data`} data-testid={`${LIB_NAME}-${props.name}-NoData`} key='NoData'>
        {props.noDataLabel}
      </div>
      )

export default NoData
