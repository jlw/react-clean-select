import React from 'react';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Option from '../components/Option';

import { valueExistInSelected, hexToRGBA, isomorphicWindow } from '../util';

const dropdownPosition = (props, methods) => {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight, 10) +
    parseInt(props.dropdownGap, 10);

  if (props.dropdownPosition !== 'auto') {
    return props.dropdownPosition;
  }

  if (
    dropdownHeight > isomorphicWindow().innerHeight &&
    dropdownHeight > DropdownBoundingClientRect.top
  ) {
    return 'top';
  }

  return 'bottom';
};

const Dropdown = ({ props, state, methods }) => (
  <div
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    className={`${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${dropdownPosition(
      props,
      methods
    )}`}>
    {props.dropdownRenderer ? (
      props.dropdownRenderer({ props, state, methods })
    ) : (
      <React.Fragment>
        {props.create &&
          state.search &&
          !valueExistInSelected(state.search, [...state.values, ...props.options], props) && (
            <div
              role="button"
              className={`${LIB_NAME}-dropdown-add-new`}
              color={props.color}
              onClick={() => methods.createNew(state.search)}>
              {props.createNewLabel.replace('{search}', `"${state.search}"`)}
            </div>
          )}
        {state.searchResults.length === 0 ? (
          <NoData className={`${LIB_NAME}-no-data`} state={state} props={props} methods={methods} />
        ) : (
          state.searchResults.map((option, optionIndex) => (
            <Option
              key={option[props.valueField].toString()}
              option={option}
              optionIndex={optionIndex}
              state={state}
              props={props}
              methods={methods}
            />
          ))
        )}

        {props.selectAll && props.options && props.multi && (
          <div
            role="button"
            className={`${LIB_NAME}-dropdown-select-all`}
            color={props.color}
            onClick={() => (methods.areAllSelected() ? methods.clearAll() : methods.selectAll())}>
            {methods.areAllSelected() ? props.clearAllLabel : props.selectAllLabel}
          </div>
        )}
      </React.Fragment>
    )}
  </div>
);

export default Dropdown;
