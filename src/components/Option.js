import React from 'react';
import {getByPath} from '../util';
import { LIB_NAME } from '../constants';

const Option = ({ item, props, state, methods }) =>
  item && props.optionRenderer ? (
    props.optionRenderer({ item, props, state, methods })
  ) : (
    <span
      role="listitem"
      disabled={props.disabled}
      className={`${LIB_NAME}-option${props.direction === 'rtl' ? ` ${LIB_NAME}-option-rtl` : ''}`}
    >
      <span className={`${LIB_NAME}-option-label`}>{getByPath(item, props.labelField)}</span>
      <span
        className={`${LIB_NAME}-option-remove`}
        onClick={(event) => methods.removeItem(event, item, props.closeOnSelect)}>
        &times;
      </span>
    </span>
  );

export default Option;
