/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import DropdownHandle from 'components/DropdownHandle'

const defaultProps = {
  dropdownHandleRenderer: null,
  name: 'something'
}
const defaultState = {
  dropdown: false
}
const defaultMethods = {
  dropDown: jest.fn()
}

const compileProps = ({ props = {}, state = {}, methods = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods }
  }
}

describe('<DropdownHandle />', () => {
  const renderComponent = (opts = {}) => render(<DropdownHandle {...compileProps(opts)} />)

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    renderComponent()

    await user.click(screen.getByTestId('react-clean-select-something-DropdownHandle'))

    expect(defaultMethods.dropDown).toHaveBeenCalledWith('open', expect.anything())
  })

  it('closes dropdown on click when already open', async () => {
    const user = userEvent.setup()
    renderComponent({ state: { dropdown: true } })

    await user.click(screen.getByTestId('react-clean-select-something-DropdownHandle'))

    expect(defaultMethods.dropDown).toHaveBeenCalledWith('close', expect.anything())
  })

  it('toggles dropdown on keyDown', async () => {
    renderComponent()

    await fireEvent.keyDown(screen.getByTestId('react-clean-select-something-DropdownHandle'))

    expect(defaultMethods.dropDown).toHaveBeenCalledWith('toggle', expect.anything())
  })

  it('supports a custom renderer (inside the component wrapper)', () => {
    renderComponent({ props: { dropdownHandleRenderer: () => (<div data-testid='foo'>-</div>) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-DropdownHandle')).toBeInTheDocument()
  })
})
