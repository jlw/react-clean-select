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
  clearable: true,
  contentRenderer: null,
  multi: true,
  name: 'something',
  labelField: 'label',
  valueField: 'value'
}
const defaultState = {
  dropdown: false,
  search: '',
  values: ['foo']
}
const defaultMethods = {
  dropDown: jest.fn(),
  getInputSize: () => undefined,
  selectedOptions: () => [defaultOption],
  setSearch: () => {}
}

const compileProps = ({ props = {}, state = {}, methods = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods }
  }
}

describe('<Content />', () => {
  const renderComponent = (opts = {}) => render(<Content {...compileProps(opts)} />)

  it('renders selected options', () => {
    renderComponent({ props: { options: [defaultOption], values: ['foo'] } })

    expect(screen.getByTestId('react-clean-select-something-Selection-label-foo')).toHaveTextContent('Foo')
    expect(screen.getByTestId('react-clean-select-something-Selection-foo')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-Selection-remove-foo')).toBeInTheDocument()
  })

  it('renders selected options with customized object keys', () => {
    const option = { id: 3, name: 'Foo' }
    renderComponent({
      methods: { selectedOptions: () => [option] },
      props: { labelField: 'name', options: [option], valueField: 'id', values: [3] }
    })

    expect(screen.getByTestId('react-clean-select-something-Selection-label-3')).toHaveTextContent('Foo')
    expect(screen.getByTestId('react-clean-select-something-Selection-3')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-Selection-remove-3')).toBeInTheDocument()
  })

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
