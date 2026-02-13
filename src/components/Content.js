import React from 'react'
import PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'

import Input from './Input'
import Selection from './Selection'
import SelectMethodsModel from '../models/SelectMethodsModel'
import SelectPropsModel from '../models/SelectPropsModel'
import SelectStateModel from '../models/SelectStateModel'

const Content = ({ props, state, methods }) => {
  const renderSelection = () => {
    if (state.values && state.values.length > 0) {
      const selections = methods.selectedOptions()
      if (props.multi) {
        return selections.map((option) => (
          <Selection
            key={`${option[props.valueField]}${option[props.labelField]}`}
            option={option}
            state={state}
            props={props}
            methods={methods}
          />
        ))
      } else {
        const selection = selections[0]
        if (selection && selection[props.labelField]) {
          return (<span>{selection[props.labelField]}</span>)
        }
      }
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
      {props.required && (
        <input
          className={`${LIB_NAME}-input-zero`}
          data-testid={`${LIB_NAME}-${props.name}-input-zero`}
          defaultValue={state.values}
          disabled={props.disabled}
          name={props.name}
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
