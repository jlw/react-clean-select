/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Option from 'components/Option'

const defaultOption = {
  value: 'foo',
  label: 'Foo'
}
const defaultProps = {
  keepSelectedInList: true,
  name: 'something',
  optionRenderer: null,
  valueField: 'value'
}
const defaultState = {
  cursor: 0
}
const defaultMethods = {
  isSelected: () => false,
  addOption: () => {}
}

const compileProps = ({ props = {}, state = {}, methods = {}, option = {}, optionIndex = 0 }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods },
    option: { ...defaultOption, ...option },
    optionIndex
  }
}

describe('<Option />', () => {
  const renderComponent = (opts = {}) => render(<Option {...compileProps(opts)} />)

  it('uses a safe version of the option value for data-testid', () => {
    renderComponent({ option: { value: "I haven't decided" } })

    expect(screen.queryAllByTestId('react-clean-select-something-Option-I-haven-t-decided')).toHaveLength(1)
  })

  it('adds the option on click', async () => {
    const user = userEvent.setup()
    const addOption = jest.fn()
    renderComponent({ methods: { addOption } })

    await user.click(screen.getByTestId('react-clean-select-something-Option-foo'))

    expect(addOption).toHaveBeenCalledWith(defaultOption)
  })

  it('does not add the option on click when disabled', async () => {
    const user = userEvent.setup()
    const addOption = jest.fn()
    renderComponent({ methods: { addOption }, option: { disabled: true } })

    await user.click(screen.getByTestId('react-clean-select-something-Option-foo'))

    expect(addOption).not.toHaveBeenCalled()
  })

  it('adds the option on keydown', async () => {
    const addOption = jest.fn()
    renderComponent({ methods: { addOption } })

    await act(async () => {
      fireEvent.keyDown(screen.getByTestId('react-clean-select-something-Option-foo'))
    })

    expect(addOption).toHaveBeenCalledWith(defaultOption)
  })

  it('does not add the option on keydown when disabled', async () => {
    const addOption = jest.fn()
    renderComponent({ methods: { addOption }, option: { disabled: true } })

    await act(async () => {
      fireEvent.keyDown(screen.getByTestId('react-clean-select-something-Option-foo'))
    })

    expect(addOption).not.toHaveBeenCalled()
  })

  it('does not render the option when selected and keepSelectedInList is false', () => {
    renderComponent({ props: { keepSelectedInList: false }, methods: { isSelected: () => true } })

    expect(screen.queryAllByTestId('react-clean-select-something-Option-foo')).toHaveLength(0)
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { optionRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Option-foo')).toHaveLength(0)
  })
})
