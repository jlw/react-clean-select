import React from 'react';
import { LIB_NAME } from '../constants';

const Clear = ({ props, state, methods }) =>
  props.clearRenderer ? (
    props.clearRenderer({ props, state, methods })
  ) : (
    <div
      className={`${LIB_NAME}-clear`}
      tabIndex="-1"
      onClick={() => methods.clearAll()}
      onKeyPress={() => methods.clearAll()}
    >
      &times;
    </div>
  );

export default Clear;
