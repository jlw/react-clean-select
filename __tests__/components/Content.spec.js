/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Content from 'components/Content'

const defaultOption = {
  value: 'foo',
  label: 'Foo'
}
const defaultProps = {
  contentRenderer: null,
  multi: true,
  name: 'something',
  labelField: 'name'
}
const defaultState = {
  dropdown: false,
  search: '',
  values: [defaultOption]
}
const defaultMethods = {
  dropDown: jest.fn(),
  getInputSize: () => undefined,
  setSearch: () => {}
}

const compileProps = ({ props = {}, state = {}, methods = {}, option = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods },
    option: { ...defaultOption, ...option }
  }
}

describe('<Content />', () => {
  const renderComponent = (opts = {}) => render(<Content {...compileProps(opts)} />)

  it('opens dropdown on click if closeOnClickInput set', async () => {
    const user = userEvent.setup()
    renderComponent({ props: { closeOnClickInput: true } })

    await user.click(screen.getByTestId('react-clean-select-something-Content'))

    // TODO: find out why DropDownHandle passes the event to this function and Content does not
    expect(defaultMethods.dropDown).toHaveBeenCalledWith('open')
  })

  it('closes dropdown on click when already open', async () => {
    const user = userEvent.setup()
    renderComponent({ props: { closeOnClickInput: true }, state: { dropdown: true } })

    await user.click(screen.getByTestId('react-clean-select-something-Content'))

    expect(defaultMethods.dropDown).toHaveBeenCalledWith('close')
  })

  it('supports a custom renderer (inside the component wrapper)', () => {
    renderComponent({ props: { contentRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-Content')).toBeInTheDocument()
  })
})
