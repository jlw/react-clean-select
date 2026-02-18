/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'

import Input from 'components/Input'

const defaultProps = {
  inputRenderer: null,
  name: 'something',
  searchable: true
}
const defaultState = {
  values: []
}
const defaultMethods = {
  dropDown: () => undefined,
  getInputSize: () => undefined,
  handleBlur: () => undefined
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

    expect(screen.getByTestId('react-clean-select-something-Input')).not.toHaveProperty('tabindex')
  })

  it('adds a placeholder', () => {
    renderComponent({ props: { placeholder: 'test' } })

    expect(screen.getByTestId('react-clean-select-something-Input')).toHaveProperty('placeholder', 'test')
  })

  it('supports disabled prop', () => {
    renderComponent({ props: { disabled: true } })

    expect(screen.getByTestId('react-clean-select-something-Input')).toHaveProperty('disabled', true)
  })

  it('opens the dropdown on focus (i.e. tabbing from another field)', async () => {
    const dropDown = jest.fn()
    renderComponent({ methods: { dropDown } })

    await act(async () => {
      fireEvent.focus(screen.getByTestId('react-clean-select-something-Input'))
    })

    expect(dropDown).toHaveBeenCalledWith('open', true)
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { inputRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Input')).toHaveLength(0)
  })
})
