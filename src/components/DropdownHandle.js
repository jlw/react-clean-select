import React from 'react'

import { LIB_NAME } from '../constants'

const DropdownHandle = ({ props, state, methods }) => {
  const toggle = (event) => {
    event.preventDefault()
    event.stopPropagation()
    methods.dropDown('toggle')
  }

  return (
    <div
      className={
        `${LIB_NAME}-dropdown-handle ${LIB_NAME}-dropdown-handle-${state.dropdown ? 'open' : 'closed'}${
        props.dropdownHandleRenderer ? '' : ` ${LIB_NAME}-dropdown-handle-rotate`
        }`
      }
      data-testid={`${LIB_NAME}-${props.name}-DropdownHandle`}
      onClick={toggle}
      onKeyDown={toggle}
      tabIndex='-1'
    >
      {props.dropdownHandleRenderer
        ? (
            props.dropdownHandleRenderer({ props, state, methods })
          )
        : (
          <svg fill='currentColor' viewBox='0 0 40 40'>
            <path d='M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z' />
          </svg>
          )}
    </div>
  )
}

export default DropdownHandle
