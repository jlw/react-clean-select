import React from 'react'

import NoData from '../components/NoData'
import Option from '../components/Option'

import { LIB_NAME } from '../constants'
import { isomorphicWindow } from '../util'

const dropdownPosition = (props, methods) => {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect()
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight, 10) +
    parseInt(props.dropdownGap, 10)

  if (props.dropdownPosition !== 'auto') {
    return props.dropdownPosition
  }

  if (
    dropdownHeight > isomorphicWindow().innerHeight &&
    dropdownHeight > DropdownBoundingClientRect.top
  ) {
    return 'top'
  }

  return 'bottom'
}

const Dropdown = ({ props, state, methods }) => {
  const renderClearAll = () => {
    if (props.selectAll && props.options && props.multi) {
      return (
        <div
          role='button'
          className={`${LIB_NAME}-dropdown-select-all`}
          onClick={(event) => {
            event.stopPropagation()
            methods.areAllSelected() ? methods.clearAll() : methods.selectAll()
          }}
        >
          {methods.areAllSelected() ? props.clearAllLabel : props.selectAllLabel}
        </div>
      )
    }
  }

  const renderInstructionsOption = () => {
    if (props.instructionsOption && (!state.search || state.search === '')) {
      const option = {}
      option[props.labelField] = props.instructionsOption
      return (
        <Option
          key='instructionsOption'
          nonSelectable
          option={option}
          optionIndex={-1}
          state={state}
          props={props}
          methods={methods}
        />
      )
    }
  }

  const renderSearchResults = () => {
    if (state.searchResults.length === 0) {
      <NoData className={`${LIB_NAME}-no-data`} state={state} props={props} methods={methods} />
    } else {
      return state.searchResults.map((option, optionIndex) => (
        <Option
          key={option[props.valueField].toString()}
          option={option}
          optionIndex={optionIndex}
          state={state}
          props={props}
          methods={methods}
        />
      ))
    }
  }

  const render = () => {
    if (props.dropdownRenderer) {
      return props.dropdownRenderer({ props, state, methods })
    }

    return (
      <>
        {renderInstructionsOption()}
        {renderSearchResults()}
        {renderClearAll()}
      </>
    )
  }

  return (
    <div
      tabIndex='-1'
      aria-expanded='true'
      role='list'
      className={`${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${dropdownPosition(
        props,
        methods
      )}`}
      data-testid={`${LIB_NAME}-${props.name}-Dropdown`}
    >
      {render()}
    </div>
  )
}

export default Dropdown
