import React, { Component } from 'react';
import { hexToRGBA, getByPath } from '../util';
import * as PropTypes from 'prop-types';
import { LIB_NAME } from '../constants';

class Item extends Component {
  item = React.createRef();

  componentDidMount() {
    const { props, methods } = this.props;

    if (
      this.item.current &&
      !props.multi &&
      props.keepSelectedInList &&
      methods.isSelected(this.props.item)
    )
      this.item.current.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  componentDidUpdate() {
    if (this.props.state.cursor === this.props.itemIndex) {
      this.item.current &&
        this.item.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  render() {
    const { props, state, methods, item, itemIndex } = this.props;

    if (props.itemRenderer) {
      return props.itemRenderer({ item, itemIndex, props, state, methods });
    }

    if (!props.keepSelectedInList && methods.isSelected(item)) {
      return null;
    }

    return (
      <span
        role="option"
        ref={this.item}
        aria-selected={methods.isSelected(item)}
        aria-disabled={item.disabled}
        aria-label={getByPath(item, props.labelField)}
        key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
        tabIndex="-1"
        className={`${LIB_NAME}-item${
          methods.isSelected(item) ? ` ${LIB_NAME}-item-selected` : ''
        }${state.cursor === itemIndex ? ` ${LIB_NAME}-item-active` : ''}${
          item.disabled ? ` ${LIB_NAME}-item-disabled` : ''
        }`}
        onClick={item.disabled ? undefined : () => methods.addItem(item)}
        onKeyPress={item.disabled ? undefined : () => methods.addItem(item)}
      >
        {getByPath(item, props.labelField)} {item.disabled && <ins>{props.disabledLabel}</ins>}
      </span>
    );
  }
}

Item.propTypes = {
  props: PropTypes.any,
  state: PropTypes.any,
  methods: PropTypes.any,
  item: PropTypes.any,
  itemIndex: PropTypes.any
};

export default Item;
