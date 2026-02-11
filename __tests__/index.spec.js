/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Select from '../src/index'

const defaultProps = {
  name: 'something',
  onChange: () => {}
}
const german = { value: 'de', label: 'Deutsch' }
const english = { value: 'en', label: 'English' }
const spanish = { value: 'es', label: 'Español' }
const languages = [german, english, spanish]

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

  describe('with a single select', () => {
    it('opens and closes', async () => {
      const user = userEvent.setup()
      renderComponent({ name: 'language', options: languages })
      const select = screen.getByTestId('react-clean-select-language')
      expect(select).not.toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)
    })

    it('opens, filters, and closes when selecting an available option', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('D')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)

      await user.keyboard('[BackSpace]Esp')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('[BackSpace][BackSpace][BackSpace]')
      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(onChange).toHaveBeenCalledWith([spanish])
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
    })

    it('supports keyboard navigation and selection', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([german])
    })

    it('handles keyboard cursor manipulation correctly', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([english])
    })

    it('handles initial ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([spanish])
    })

    it('IGNORES closeOnSelect', async () => {
      const user = userEvent.setup()
      renderComponent({ closeOnSelect: false, name: 'language', options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
    })

    it('optionally renders open for debugging', () => {
      renderComponent({ keepOpen: true, name: 'language', options: languages })

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)
    })

    it('renders the currently-selected option', () => {
      const female = { value: 'female', label: 'Female' }
      const options = [female, { value: 'male', label: 'Male' }]
      renderComponent({ name: 'gender', options, values: [female] })

      expect(screen.getByTestId('react-clean-select-gender-Content')).toHaveTextContent('Female')
    })
  })

  describe('with a multiple select', () => {
    it('opens and closes', async () => {
      const user = userEvent.setup()
      renderComponent({ name: 'language', multi: true, options: languages })
      const select = screen.getByTestId('react-clean-select-language')
      expect(select).not.toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)
    })

    it('opens, filters, and stays open when selecting an available option', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('D')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)

      await user.keyboard('[BackSpace]Esp')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('[BackSpace][BackSpace][BackSpace]')
      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(onChange).toHaveBeenCalledWith([spanish])
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'true')
    })

    it('supports keyboard navigation and selection', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([german])
    })

    it('handles keyboard cursor manipulation correctly', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([english])
    })

    it('handles initial ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([spanish])
    })

    it('ArrowDown skips over already-selected options when not kept in list', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({
        keepSelectedInList: false,
        name: 'language',
        multi: true,
        onChange,
        options: languages,
        values: [german]
      })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([german, english])
    })

    it('ArrowUp skips over already-selected options when not kept in list', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({
        keepSelectedInList: false,
        name: 'language',
        multi: true,
        onChange,
        options: languages,
        values: [spanish]
      })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith([spanish, english])
    })

    it('optionally closes when selecting an option', async () => {
      const user = userEvent.setup()
      renderComponent({ closeOnSelect: true, name: 'language', multi: true, options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByTestId('react-clean-select-language-Content')).toHaveTextContent('Español')
    })

    it('optionally renders open for debugging', () => {
      renderComponent({ keepOpen: true, name: 'language', options: languages })

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)
    })

    it('renders the current selections and optionally allows clearing', async () => {
      const user = userEvent.setup()
      const pub = { value: 'public', label: 'Public' }
      const priv = { value: 'private', label: 'Private' }
      const options = [pub, priv, { value: 'non-traditional', label: 'Non-Traditional' }]
      const onChange = jest.fn()
      renderComponent({ clearable: true, name: 'schooling', multi: true, onChange, options, values: [pub, priv] })

      expect(screen.getByTestId('react-clean-select-schooling-Selection-public')).toBeInTheDocument()
      expect(screen.getByTestId('react-clean-select-schooling-Selection-private')).toBeInTheDocument()
      expect(screen.queryAllByTestId('react-clean-select-schooling-Selection-non-traditional')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-schooling-Selection-remove-public'))

      expect(onChange).toHaveBeenCalledWith([priv])
    })
  })
})
