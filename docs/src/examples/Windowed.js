import React from 'react';
import styled from '@emotion/styled';
import { List, AutoSizer } from 'react-virtualized';
import { Heading } from './components/Heading';
import Select from '../../../src';

const optionData = Array.from(Array(20000).keys()).map((value) => ({
  value: `value ${value}`,
  label: `Option # ${value}`
}));

const customDropdownRenderer = ({ methods, state, props }) => {
  const regexp = new RegExp(state.search, 'i');
  const options =  props.searchable
    ? optionData.filter((option) => regexp.test(option[props.searchBy] || option[props.labelField]))
    : optionData;

  return (
    <AutoSizer style={{ height: '200px' }}>
      {({width, height}) => (
        <StyledList
          height={height}
          rowCount={options.length}
          rowHeight={40}
          width={width - 2}
          rowRenderer={({ index, style, key }) => (
            <Option key={key}
                  style={style}
                  onClick={() => methods.addOption(options[index])}>
              {options[index].label}
            </Option>
          )}
        />
  )}
    </AutoSizer>
  );
};

const Windowed = ({ title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/jlw/react-clean-select/tree/master/docs/src/examples/Windowed.js"
    />

    <p>
      Using <a href="https://jlw.github.io/react-clean-select/prop/dropdown-renderer">dropdownRenderer</a> and <a href="https://github.com/bvaughn/react-virtualized">
      bvaughn/react-virtualized
    </a>
    </p>

    <Select
      dropdownRenderer={ customDropdownRenderer }
      values={[{
        value: 'value 42',
        label: 'Option # 42'
      }]}
      multi
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

Windowed.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledList = styled(List)`
  overflow: auto;
  height: 200px;
  max-height: 200px;
`;

const Option = styled.div`
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  width: 480px;
  height: 40px;

  &:hover {
    background: #f2f2f2;
  }

  ${({ disabled }) => disabled && 'text-decoration: line-through;'}
`;

export default Windowed;
