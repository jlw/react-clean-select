/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Input from 'components/Input'

const defaultProps = {
  create: true,
  inputRenderer: null,
  name: 'something',
  searchable: true
}
const defaultState = {
  values: [{ id: 1, label: 'Name' }]
}
const defaultMethods = {
  getInputSize: () => undefined
}

const compileProps = ({ props = {}, state = {}, methods = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods }
  }
}

describe('<Input />', () => {
  const renderComponent = (opts = {}) => render(<Input {...compileProps(opts)} />)

  it('TODO: build sufficient tests', () => {
    renderComponent()
  })

  it('supports disabled prop', () => {
    renderComponent({ props: { disabled: true } })

    expect(screen.getByTestId('react-clean-select-something-Input')).toHaveProperty('disabled', true)
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { inputRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Input')).toHaveLength(0)
  })
})
