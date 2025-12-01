/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';

import Selection from '../../src/components/Selection';

import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    selectionRenderer: null
  },
  state: {
    cursor: 0
  },
  methods: {
    isSelected: () => undefined,
    addOption: () => undefined,
    removeOption: () => spy
  },
  ...props
});

describe('<Selection /> component', () => {
  beforeEach(() => {
    spy = jest.fn();
  });

  afterEach(() => {
    spy = null;
  });

  it('renders correctly', () => {
    const tree = TestRenderer.create(<Selection {...props({ option: options[0] })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onClick remove option', () => {
    TestRenderer.create(<Selection {...props({ option: options[0] })} onClick={spy} />)
      .root.findByProps({ className: 'react-clean-select-selection-remove' })
      .props.onClick();

    expect(spy).toHaveBeenCalled;
  });
});
