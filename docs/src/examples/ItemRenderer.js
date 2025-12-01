import React from 'react';
import styled from '@emotion/styled';
import Select from '../../../src';
import { Heading } from './components/Heading';

const OptionRenderer = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/jlw/react-clean-select/tree/master/docs/src/examples/OptionRenderer.js"
    />

    <Select
      multi
      options={options}
      values={[]}
      optionRenderer={({ option, methods }) => (
        <StyledOption>
          {option.disabled ? (
            <div aria-disabled>{option.label}</div>
          ) : (
            <div onClick={() => methods.addOption(option)}>
              <input onChange={() => methods.addOption(option)} type="checkbox" checked={methods.isSelected(option)} /> {option.label}
            </div>
          )}
        </StyledOption>
      )}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

OptionRenderer.propTypes = {};

const StyledOption = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 10px;
  }

  :hover {
    background: #f2f2f2;
  }
`;

export default OptionRenderer;
