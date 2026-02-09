/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Dropdown from 'components/Dropdown'

const defaultProps = {
  dropdownRenderer: null,
  dropdownGap: 5,
  dropdownHeight: '300px',
  name: 'something'
}
const defaultState = {
  selectBounds: {},
  searchResults: []
}
const defaultMethods = {
  searchResults: () => [],
  getSelectRef: () => ({
    blur: () => {},
    getBoundingClientRect: () => ({ top: 100, bottom: 100 })
  })
}

const compileProps = ({ props = {}, state = {}, methods = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods }
  }
}

describe('<Dropdown />', () => {
  const renderComponent = (opts = {}) => render(<Dropdown {...compileProps(opts)} />)

  it('TODO: build sufficient tests', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-Dropdown')).toBeInTheDocument()
  })

  it('supports a custom renderer (inside the component wrapper)', () => {
    renderComponent({ props: { dropdownRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-Dropdown')).toBeInTheDocument()
  })
})
