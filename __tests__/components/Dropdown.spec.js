/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Dropdown from 'components/Dropdown'

const defaultProps = {
  dropdownRenderer: null,
  dropdownGap: 5,
  dropdownHeight: '300px',
  labelField: 'label',
  name: 'something',
  noDataLabel: 'No data',
  valueField: 'value'
}
const defaultState = {
  selectBounds: {},
  searchResults: [{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }, { value: 'es', label: 'Español' }]
}
const defaultMethods = {
  getSelectRef: () => ({
    blur: () => {},
    getBoundingClientRect: () => ({ top: 100, bottom: 100 })
  }),
  isSelected: () => false,
  searchResults: () => []
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
    expect(screen.getByTestId('react-clean-select-something-Option-de')).toHaveTextContent('Deutsch')
    expect(screen.getByTestId('react-clean-select-something-Option-en')).toHaveTextContent('English')
    expect(screen.getByTestId('react-clean-select-something-Option-es')).toHaveTextContent('Español')
  })

  it('shows no data when search results are empty', () => {
    renderComponent({ state: { searchResults: [] } })

    expect(screen.queryByTestId('react-clean-select-something-NoData')).toHaveTextContent('No data')
  })

  it('optionally adds a non-selectable instructions option', async () => {
    const user = userEvent.setup()
    const addOption = jest.fn()
    renderComponent({ props: { instructionsOption: 'Type to search…' }, methods: { addOption } })

    const instructions = screen.getByTestId('react-clean-select-something-OptionInstructions')
    expect(instructions).toHaveTextContent('Type to search…')
    expect(instructions).toHaveAttribute('data-non-selectable')
    expect(screen.getByTestId('react-clean-select-something-Option-de')).toHaveTextContent('Deutsch')

    await user.click(instructions)

    expect(addOption).not.toHaveBeenCalled()
  })

  it('does not add a non-selectable instructions option when a search is present', () => {
    renderComponent({ props: { instructionsOption: 'Type to search…' }, state: { search: 'D' } })

    expect(screen.queryAllByTestId('react-clean-select-something-OptionInstructions')).toHaveLength(0)
    expect(screen.getByTestId('react-clean-select-something-Option-de')).toHaveTextContent('Deutsch')
  })

  it('supports a custom renderer (inside the component wrapper)', () => {
    renderComponent({ props: { dropdownRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-something-Dropdown')).toBeInTheDocument()
  })
})
