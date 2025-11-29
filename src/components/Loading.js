import React from 'react';
import { LIB_NAME } from '../constants';

const Loading = ({ props }) =>
  props.loadingRenderer ? (
    props.loadingRenderer({ props })
  ) : (
    <div className={`${LIB_NAME}-loading`} />
  );

export default Loading;
