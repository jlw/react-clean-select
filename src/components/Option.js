import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

import { LIB_NAME } from '../constants'
import { getOptionSlug } from '../util'

class Option extends Component {
  option = React.createRef()

  componentDidMount () {
    const { props, methods } = this.props

    if (
      this.option.current &&
      this.option.current.scrollIntoView &&
      !props.multi &&
      props.keepSelectedInList &&
      methods.isSelected(this.props.option)
    ) { this.option.current.scrollIntoView({ block: 'nearest', inline: 'start' }) }
  }

  componentDidUpdate () {
    if (this.props.state.cursor === this.props.optionIndex) {
      this.option.current &&
      this.option.current.scrollIntoView &&
        this.option.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
  }

  addOption (event) {
    event.preventDefault()
    event.stopPropagation()
    const { methods, nonSelectable, option } = this.props
    if (option.disabled || nonSelectable) { return }

    methods.addOption(option)
  }

  render () {
    const { props, state, methods, nonSelectable, option, optionIndex } = this.props

    if (props.optionRenderer) {
      return props.optionRenderer(this.props)
    }

    if (!props.keepSelectedInList && methods.isSelected(option)) {
      return null
    }

    let dataTestId = `${LIB_NAME}-${props.name}-Option-${getOptionSlug(option, props)}`
    if (nonSelectable) {
      dataTestId = `${LIB_NAME}-${props.name}-OptionInstructions`
    }

    return (
      <span
        role='option'
        ref={this.option}
        aria-selected={methods.isSelected(option)}
        aria-disabled={option.disabled}
        aria-label={option[props.labelField]}
        key={`${option[props.valueField]}${option[props.labelField]}`}
        tabIndex='-1'
        className={`${LIB_NAME}-option${
          methods.isSelected(option) ? ` ${LIB_NAME}-option-selected` : ''
        }${state.cursor === optionIndex ? ` ${LIB_NAME}-option-active` : ''}${
          option.disabled ? ` ${LIB_NAME}-option-disabled` : ''
        }`}
        data-testid={dataTestId}
        data-non-selectable={nonSelectable ? 'true' : null}
        onClick={this.addOption.bind(this)}
        onKeyDown={this.addOption.bind(this)}
      >
        {option[props.labelField]}{option.disabled && <ins>{props.disabledLabel}</ins>}
      </span>
    )
  }
}

Option.propTypes = {
  props: PropTypes.any,
  state: PropTypes.any,
  methods: PropTypes.any,
  option: PropTypes.any,
  optionIndex: PropTypes.any
}

export default Option
