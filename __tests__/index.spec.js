/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import Select from '../src/index'

const defaultProps = {
  name: 'something',
  onChange: () => {}
}

describe('<Select />', () => {
  const renderComponent = (props = {}) => render(<Select {...defaultProps} {...props} />)

  it('TODO: needs sufficient functionality tests', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-Input')).toBeInTheDocument()
  })

  it('does not include the separator by default', () => {
    renderComponent()

    expect(screen.queryAllByTestId('react-clean-select-something-Separator')).toHaveLength(0)
  })

  it('optionally includes separator', () => {
    renderComponent({ separator: true })

    expect(screen.getByTestId('react-clean-select-something-Separator')).toBeInTheDocument()
  })

  it('does not include the clear widget by default', () => {
    renderComponent()

    expect(screen.queryAllByTestId('react-clean-select-something-Clear')).toHaveLength(0)
  })

  it('optionally includes clear widget', () => {
    renderComponent({ clearable: true })

    expect(screen.getByTestId('react-clean-select-something-Clear')).toBeInTheDocument()
  })

  it('does not include the loading indicator by default', () => {
    renderComponent()

    expect(screen.queryAllByTestId('react-clean-select-something-Loading')).toHaveLength(0)
  })

  it('optionally shows loading', () => {
    renderComponent({ loading: true })

    expect(screen.getByTestId('react-clean-select-something-Loading')).toBeInTheDocument()
  })

  it('adds name to base input', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-input-zero')).toHaveProperty('name', 'something')
  })

  it('optionally disables the input', () => {
    renderComponent({ disabled: true })

    expect(screen.getByTestId('react-clean-select-something-Input')).toHaveProperty('disabled', true)
  })

  it('opens, filters, and selects available options', async () => {
    const onChange = jest.fn()
    const options = [{ value: 'de', label: 'Deutsch' }, { value: 'en', label: 'English' }, { value: 'es', label: 'Español' }]
    renderComponent({ name: 'language', onChange, options })
    expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

    await fireEvent.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

    expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

    const input = screen.getByTestId('react-clean-select-language-Input')
    await fireEvent.change(input, { target: { value: 'D' } })

    expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)

    await fireEvent.change(input, { target: { value: 'Esp' } })

    expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
    expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

    await fireEvent.click(screen.getByTestId('react-clean-select-language-Option-es'))

    expect(onChange).toHaveBeenCalledWith([{ value: 'es', label: 'Español' }])
  })

  it('renders the currently-selected single option', () => {
    const female = { value: 'female', label: 'Female' }
    const options = [female, { value: 'male', label: 'Male' }]
    renderComponent({ name: 'gender', options, values: [female] })

    expect(screen.getByTestId('react-clean-select-gender-Content')).toHaveTextContent('Female')
  })

  it('renders the current selections for a multiple field', () => {
    const pub = { value: 'public', label: 'Public' }
    const priv = { value: 'private', label: 'Private' }
    const options = [pub, priv, { value: 'non-traditional', label: 'Non-Traditional' }]
    renderComponent({ name: 'schooling', multi: true, options, values: [pub, priv] })

    expect(screen.getByTestId('react-clean-select-schooling-Selection-public')).toBeInTheDocument()
    expect(screen.getByTestId('react-clean-select-schooling-Selection-private')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-schooling-Selection-non-traditional')).toHaveLength(0)
  })
})
