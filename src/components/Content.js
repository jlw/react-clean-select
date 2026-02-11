import React from 'react'
import PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'
import { getByPath } from '../util'

import Input from './Input'
import Selection from './Selection'
import SelectMethodsModel from '../models/SelectMethodsModel'
import SelectPropsModel from '../models/SelectPropsModel'
import SelectStateModel from '../models/SelectStateModel'

const Content = ({ props, state, methods }) => {
  const renderSelection = () => {
    if (props.multi && state.values) {
      return state.values.map((option) => (
        <Selection
          key={`${getByPath(option, props.valueField)}${getByPath(option, props.labelField)}`}
          option={option}
          state={state}
          props={props}
          methods={methods}
        />
      ))
    } else if (!props.multi && state.values && state.values.length > 0) {
      return (<span>{getByPath(state.values[0], props.labelField)}</span>)
    }
  }

  const renderContent = () => {
    if (props.contentRenderer) {
      return props.contentRenderer({ props, state, methods })
    }

    return (
      <>
        {renderSelection()}
        <Input props={props} methods={methods} state={state} />
      </>
    )
  }

  return (
    <div
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      data-testid={`${LIB_NAME}-${props.name}-Content`}
      onClick={(event) => {
        event.stopPropagation()
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close')
        } else {
          return methods.dropDown('open')
        }
      }}
    >
      {renderContent()}
      {(props.name || props.required) && (
        <input
          className={`${LIB_NAME}-input-zero`}
          data-testid={`${LIB_NAME}-${props.name}-input-zero`}
          defaultValue={state.values.map((value) => value[props.valueField]).toString() || []}
          disabled={props.disabled}
          name={props.name}
          pattern={props.pattern}
          required={props.required}
          tabIndex={-1}
        />
      )}
    </div>
  )
}

Content.propTypes = {
  props: PropTypes.shape(SelectPropsModel),
  state: PropTypes.shape(SelectStateModel),
  methods: PropTypes.shape(SelectMethodsModel)
}

export default Content
