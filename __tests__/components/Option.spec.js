/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Option from '../../src/components/Option';
import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    optionRenderer: null
  },
  state: {
    cursor: 0
  },
  methods: {
    isSelected: () => undefined,
    addOption: () => undefined
  },
  ...props
});

describe('<Option /> component', () => {
  beforeEach(() => {
    spy = jest.fn();
  });

  xit('renders correctly', () => {
    const tree = TestRenderer.create(<Option {...props({ option: options[0] })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('onChange with click', () => {
    TestRenderer.create(<Option {...props({ option: options[0] })} onClick={spy} />)
      .root.findByType('span')
      .props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  test('onChange with key press', () => {
    TestRenderer.create(<Option {...props({ option: options[0] })} ononKeyPress={spy} />)
      .root.findByType('span')
      .props.onKeyPress();

    expect(spy).toHaveBeenCalled;
  });

  test('keepSelectedInList: false', () => {
    const tree = TestRenderer.create(
      <Option
        {...props({
          option: options[0],
          parentProps: {
            optionRenderer: null,
            keepSelectedInList: false
          },
          parentMethods: {
            isSelected: () => true
          }
        })}
      />
    ).toJSON();
  });

  xit('pass option renderer', () => {
    const tree = TestRenderer.create(
      <Option {...props({ option: options[0], optionRenderer: () => <div>option</div> })} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
