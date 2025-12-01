import React, { Component } from 'react';
import { hexToRGBA, getByPath } from '../util';
import * as PropTypes from 'prop-types';
import { LIB_NAME } from '../constants';

class Option extends Component {
  option = React.createRef();

  componentDidMount() {
    const { props, methods } = this.props;

    if (
      this.option.current &&
      !props.multi &&
      props.keepSelectedInList &&
      methods.isSelected(this.props.option)
    )
      this.option.current.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  componentDidUpdate() {
    if (this.props.state.cursor === this.props.optionIndex) {
      this.option.current &&
        this.option.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  render() {
    const { props, state, methods, option, optionIndex } = this.props;

    if (props.optionRenderer) {
      return props.optionRenderer({ option, optionIndex, props, state, methods });
    }

    if (!props.keepSelectedInList && methods.isSelected(option)) {
      return null;
    }

    return (
      <span
        role="option"
        ref={this.option}
        aria-selected={methods.isSelected(option)}
        aria-disabled={option.disabled}
        aria-label={getByPath(option, props.labelField)}
        key={`${getByPath(option, props.valueField)}${getByPath(option, props.labelField)}`}
        tabIndex="-1"
        className={`${LIB_NAME}-option${
          methods.isSelected(option) ? ` ${LIB_NAME}-option-selected` : ''
        }${state.cursor === optionIndex ? ` ${LIB_NAME}-option-active` : ''}${
          option.disabled ? ` ${LIB_NAME}-option-disabled` : ''
        }`}
        onClick={option.disabled ? undefined : () => methods.addOption(option)}
        onKeyPress={option.disabled ? undefined : () => methods.addOption(option)}
      >
        {getByPath(option, props.labelField)} {option.disabled && <ins>{props.disabledLabel}</ins>}
      </span>
    );
  }
}

Option.propTypes = {
  props: PropTypes.any,
  state: PropTypes.any,
  methods: PropTypes.any,
  option: PropTypes.any,
  optionIndex: PropTypes.any
};

export default Option;
