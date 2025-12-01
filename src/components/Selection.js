import React from 'react';

import { LIB_NAME } from '../constants';
import { getByPath } from '../util';

const Selection = ({ option, props, state, methods }) =>
  option && props.selectionRenderer ? (
    props.selectionRenderer({ option, props, state, methods })
  ) : (
    <span
      role="listitem"
      disabled={props.disabled}
      className={`${LIB_NAME}-selection${props.direction === 'rtl' ? ` ${LIB_NAME}-selection-rtl` : ''}`}
    >
      <span className={`${LIB_NAME}-selection-label`}>{getByPath(option, props.labelField)}</span>
      <span
        className={`${LIB_NAME}-selection-remove`}
        onClick={(event) => methods.removeOption(event, option, props.closeOnSelect)}>
        &times;
      </span>
    </span>
  );

export default Selection;
