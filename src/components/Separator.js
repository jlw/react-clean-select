import React from 'react';
import { LIB_NAME } from '../constants';

const Separator = ({ props, state, methods }) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods })
  ) : (
    <div className={`${LIB_NAME}-separator`} />
  );

export default Separator;
