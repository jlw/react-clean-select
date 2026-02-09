/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import Selection from 'components/Selection'

const defaultProps = {
  closeOnSelect: false,
  labelField: 'label',
  name: 'something',
  selectionRenderer: null,
  valueField: 'value'
}
const defaultState = {
  cursor: 0
}
const defaultMethods = {
  removeOption: () => {}
}
const defaultOption = {
  value: 'foo',
  label: 'Foo'
}

const compileProps = ({ props = {}, state = {}, methods = {}, option = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods },
    option: { ...defaultOption, ...option }
  }
}

describe('<Selection />', () => {
  const renderComponent = (opts = {}) => render(<Selection {...compileProps(opts)} />)

  it('renders the label for the option', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-Selection-label-foo')).toHaveTextContent('Foo')
  })

  it.only('uses a safe version of the option value for data-testid', () => {
    renderComponent({ option: { value: "I haven't decided" } })

    expect(screen.queryAllByTestId('react-clean-select-something-Selection-I-haven-t-decided')).toHaveLength(1)
  })

  it('removes the option on click', async () => {
    const removeOption = jest.fn()
    renderComponent({ methods: { removeOption } })

    await fireEvent.click(screen.getByTestId('react-clean-select-something-Selection-remove-foo'))

    expect(removeOption).toHaveBeenCalledWith(expect.anything(), defaultOption, false)
  })

  it('sends closeOnSelect with the removal', async () => {
    const removeOption = jest.fn()
    renderComponent({ props: { closeOnSelect: true }, methods: { removeOption } })

    await fireEvent.click(screen.getByTestId('react-clean-select-something-Selection-remove-foo'))

    expect(removeOption).toHaveBeenCalledWith(expect.anything(), defaultOption, true)
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { selectionRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Selection-foo')).toHaveLength(0)
  })
})
