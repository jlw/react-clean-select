import React from 'react';
import PropTypes from 'prop-types';

import { LIB_NAME } from '../constants';
import { getByPath } from '../util';

import Input from './Input';
import Selection from './Selection';
import SelectMethodsModel from '../models/SelectMethodsModel';
import SelectPropsModel from '../models/SelectPropsModel';
import SelectStateModel from '../models/SelectStateModel';

const Content = ({ props, state, methods }) => {
  return (
    <div
      className={`${LIB_NAME}-content ${
        props.multi ? `${LIB_NAME}-type-multi` : `${LIB_NAME}-type-single`
      }`}
      onClick={(event) => {
        event.stopPropagation();
        if (state.dropdown === true && props.closeOnClickInput && !state.search) {
          return methods.dropDown('close');
        } else {
          return methods.dropDown('open');
        }
      }}>
      {props.contentRenderer ? (
        props.contentRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.multi
            ? state.values &&
              state.values.map((option) => (
                <Selection
                  key={`${getByPath(option, props.valueField)}${getByPath(option, props.labelField)}`}
                  option={option}
                  state={state}
                  props={props}
                  methods={methods}
                />
              ))
            : state.values &&
              state.values.length > 0 && <span>{getByPath(state.values[0], props.labelField)}</span>}
          <Input props={props} methods={methods} state={state} />
        </React.Fragment>
      )}
    </div>
  );
};

Content.propTypes = {
  props: PropTypes.shape(SelectPropsModel),
  state: PropTypes.shape(SelectStateModel),
  methods: PropTypes.shape(SelectMethodsModel),
};

export default Content;
