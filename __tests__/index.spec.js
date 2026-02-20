/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Select from '../src/index'

const defaultProps = {
  name: 'something',
  onChange: () => {}
}

const female = { value: 'female', label: 'Female' }
const male = { value: 'male', label: 'Male' }
const genders = [female, male]

const german = { value: 'de', label: 'Deutsch' }
const english = { value: 'en', label: 'English' }
const spanish = { value: 'es', label: 'Español' }
const languages = [german, english, spanish]

describe('<Select />', () => {
  const renderComponent = (props = {}) => render(<Select {...defaultProps} {...props} />)

  it('TODO: needs sufficient functionality tests', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-Container')).toBeInTheDocument()
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

  it('does not include the base input by default', () => {
    renderComponent()

    expect(screen.queryAllByTestId('react-clean-select-something-input-zero')).toHaveLength(0)
  })

  it('adds base input when required', () => {
    renderComponent({ required: true })

    expect(screen.getByTestId('react-clean-select-something-input-zero')).toHaveProperty('name', 'something')
  })

  it('optionally disables the input', () => {
    renderComponent({ disabled: true })

    expect(screen.getByTestId('react-clean-select-something-Input')).toHaveProperty('disabled', true)
  })

  it('optionally triggers onBlur', async () => {
    const onBlur = jest.fn()
    renderComponent({ onBlur })

    await act(async () => {
      fireEvent.focus(screen.getByTestId('react-clean-select-something'))
    })
    await act(async () => {
      fireEvent.blur(screen.getByTestId('react-clean-select-something'))
    })

    expect(onBlur).toHaveBeenCalled()
  })

  it('blurs on Escape', async () => {
    const user = userEvent.setup()
    const onBlur = jest.fn()
    const onChange = jest.fn()
    renderComponent({ name: 'gender', onBlur, onChange, options: genders })

    await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
    await user.keyboard('[ArrowUp]')
    await user.keyboard('[Escape]')

    expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'false')
    expect(onBlur).toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('blurs on Tab', async () => {
    const user = userEvent.setup()
    const onBlur = jest.fn()
    const onChange = jest.fn()
    renderComponent({ name: 'gender', onBlur, onChange, options: genders })

    await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
    await user.keyboard('[ArrowUp]')
    await user.keyboard('[Tab]')

    expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'false')
    expect(onBlur).toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })

  describe('with a single select', () => {
    it('renders the currently-selected option', () => {
      renderComponent({ name: 'gender', options: genders, values: ['female'] })

      expect(screen.getByTestId('react-clean-select-gender-Selection')).toHaveTextContent('Female')
    })

    it('opens and closes', async () => {
      const user = userEvent.setup()
      renderComponent({ name: 'language', options: languages })
      const select = screen.getByTestId('react-clean-select-language')
      expect(select).not.toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'true')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
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

      expect(screen.queryAllByTestId('react-clean-select-language-NoData')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('D')

      expect(screen.queryAllByTestId('react-clean-select-language-NoData')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)

      await user.keyboard('[BackSpace]Q')

      expect(screen.queryAllByTestId('react-clean-select-language-NoData')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(0)

      await user.keyboard('[BackSpace]Esp')

      expect(screen.queryAllByTestId('react-clean-select-language-NoData')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('[BackSpace][BackSpace][BackSpace]')
      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(onChange).toHaveBeenCalledWith(['es'])
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
    })

    it('supports keyboard navigation and selection', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['de'])
    })

    it('handles keyboard cursor manipulation correctly', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['en'])
    })

    it('handles initial ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['es'])
    })

    it('supports non-selectable instructions option', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ instructionsOption: 'Type to search…', name: 'language', onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.getByTestId('react-clean-select-language-OptionInstructions')).toBeInTheDocument()

      await user.keyboard('En')

      expect(screen.queryAllByTestId('react-clean-select-language-OptionInstructions')).toHaveLength(0)

      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['en'])
    })

    it('IGNORES closeOnSelect and ALWAYS closes', async () => {
      const user = userEvent.setup()
      renderComponent({ closeOnSelect: false, name: 'language', options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.click(screen.getByTestId('react-clean-select-language-Option-es'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
    })

    it('allows clearing selections with backspace', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'gender', onChange, options: genders, values: ['female'] })

      await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
      await user.keyboard('[Backspace]')

      expect(onChange).toHaveBeenCalledWith([])
      expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'true')
    })

    it('optionally allows free text entry (via dropDownClose)', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ allowFreeTextEntry: true, name: 'gender', onChange, options: genders, values: [] })

      await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
      await user.keyboard('femal')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(1)

      await user.keyboard('en')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(0)

      await user.keyboard('[Tab]')

      expect(onChange).toHaveBeenCalledWith(['femalen'])
      expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'false')
    })

    it('optionally allows free text entry (via handleKeyDown)', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ allowFreeTextEntry: true, name: 'gender', onChange, options: genders, values: [] })

      await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
      await user.keyboard('femal')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(1)

      await user.keyboard('en')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(0)

      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['femalen'])
      expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes when selecting with the keyboard', async () => {
      const user = userEvent.setup()
      renderComponent({ closeOnSelect: false, name: 'language', options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByTestId('react-clean-select-language-Content')).toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
    })

    it('closes when selecting with the keyboard (bypassing allowFreeTextEntry)', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ allowFreeTextEntry: true, closeOnSelect: false, name: 'language', onChange, options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('Eng')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)

      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['en'])
    })

    it('optionally renders open for debugging', () => {
      renderComponent({ keepOpen: true, name: 'language', options: languages })

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)
    })

    it('safely renders when provided value is not in options', () => {
      renderComponent({ name: 'gender', options: genders, required: true, values: ['none'] })

      expect(screen.queryAllByTestId('react-clean-select-gender-Selection')).toHaveLength(0)
      expect(screen.getByTestId('react-clean-select-gender-input-zero')).toHaveProperty('value', 'none')
    })

    it('safely renders when receiving null value', () => {
      renderComponent({ name: 'gender', options: genders, values: null })

      expect(screen.queryAllByTestId('react-clean-select-gender-Selection')).toHaveLength(0)
    })

    it('safely renders when receiving undefined value', () => {
      renderComponent({ name: 'gender', options: genders, values: undefined })

      expect(screen.queryAllByTestId('react-clean-select-gender-Selection')).toHaveLength(0)
    })
  })

  describe('with a multiple select', () => {
    it('opens and closes', async () => {
      const user = userEvent.setup()
      renderComponent({ name: 'language', multi: true, options: languages })
      const select = screen.getByTestId('react-clean-select-language')
      expect(select).not.toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'true')
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

      expect(onChange).toHaveBeenCalledWith(['es'])
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'true')
    })

    it('supports custom searchBy option property', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const searchAbleLanguages = [
        { value: 'de', label: 'Deutsch', searchMe: 'german' },
        { value: 'en', label: 'English', searchMe: 'english' }
      ]
      renderComponent({ name: 'language', multi: true, onChange, options: searchAbleLanguages, searchBy: 'searchMe' })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)

      await user.keyboard('german')

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
    })

    it('supports keyboard navigation and selection', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['de'])
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

      expect(onChange).toHaveBeenCalledWith(['en'])
    })

    it('handles initial ArrowUp', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['es'])
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
        values: ['de']
      })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['de', 'en'])
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
        values: ['es']
      })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[ArrowUp]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['es', 'en'])
    })

    it('supports non-selectable instructions option', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ instructionsOption: 'Type to search…', name: 'language', multi: true, onChange, options: languages })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.getByTestId('react-clean-select-language-OptionInstructions')).toBeInTheDocument()

      await user.keyboard('Eng')

      expect(screen.queryAllByTestId('react-clean-select-language-OptionInstructions')).toHaveLength(0)

      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(onChange).toHaveBeenCalledWith(['en'])
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
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
    })

    it('optionally closes when selecting with the keyboard', async () => {
      const user = userEvent.setup()
      renderComponent({ closeOnSelect: true, name: 'language', multi: true, options: languages })
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)

      await user.keyboard('[ArrowDown]')
      await user.keyboard('[Enter]')

      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByTestId('react-clean-select-language-Content')).toHaveTextContent('Deutsch')
      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(0)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(0)
    })

    it('optionally renders open for debugging', () => {
      renderComponent({ keepOpen: true, name: 'language', options: languages })

      expect(screen.queryAllByTestId('react-clean-select-language-Option-de')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-en')).toHaveLength(1)
      expect(screen.queryAllByTestId('react-clean-select-language-Option-es')).toHaveLength(1)
    })

    it('allows clearing individual selections', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages, values: ['en', 'es'] })

      expect(screen.getByTestId('react-clean-select-language-Selection-en')).toBeInTheDocument()
      expect(screen.getByTestId('react-clean-select-language-Selection-es')).toBeInTheDocument()
      expect(screen.queryAllByTestId('react-clean-select-language-Selection-de')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-language-Selection-remove-en'))

      expect(onChange).toHaveBeenCalledWith(['es'])
    })

    it('allows clearing selections with backspace', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ name: 'language', multi: true, onChange, options: languages, values: ['en', 'es'] })

      await user.click(screen.getByTestId('react-clean-select-language-DropdownHandle'))
      await user.keyboard('[Backspace]')

      expect(onChange).toHaveBeenCalledWith(['en'])
      expect(screen.getByTestId('react-clean-select-language')).toHaveAttribute('aria-expanded', 'true')
    })

    it('optionally allows clearing all selections', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({
        clearable: true,
        name: 'language',
        multi: true,
        onChange,
        options: languages,
        values: ['en', 'es']
      })

      await user.click(screen.getByTestId('react-clean-select-language-Clear'))

      expect(onChange).toHaveBeenCalledWith([])
    })

    it('IGNORES allowFreeTextEntry', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({ allowFreeTextEntry: true, name: 'gender', multi: true, onChange, options: genders, values: [] })

      await user.click(screen.getByTestId('react-clean-select-gender-DropdownHandle'))
      await user.keyboard('femal')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(1)

      await user.keyboard('en')

      expect(screen.queryAllByTestId('react-clean-select-gender-Option-female')).toHaveLength(0)

      await user.keyboard('[Tab]')

      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByTestId('react-clean-select-gender')).toHaveAttribute('aria-expanded', 'false')
    })

    it('supports custom fields and numerical values', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      renderComponent({
        name: 'schools',
        multi: true,
        onChange,
        options: [{ id: 1, label: 'Public' }, { id: 2, label: 'Private' }, { id: 3, label: 'Non-Traditional' }],
        valueField: 'id',
        values: [1, 2]
      })

      expect(screen.getByTestId('react-clean-select-schools-Selection-1')).toBeInTheDocument()
      expect(screen.getByTestId('react-clean-select-schools-Selection-2')).toBeInTheDocument()
      expect(screen.queryAllByTestId('react-clean-select-schools-Selection-3')).toHaveLength(0)

      await user.click(screen.getByTestId('react-clean-select-schools-Selection-remove-1'))

      expect(onChange).toHaveBeenCalledWith([2])
    })

    it('safely renders when provided value is not in options', () => {
      renderComponent({ name: 'language', multi: true, options: languages, required: true, values: ['none'] })

      expect(screen.getByTestId('react-clean-select-language-Content').textContent).toEqual('')
      expect(screen.getByTestId('react-clean-select-language-input-zero')).toHaveProperty('value', 'none')
    })

    it('safely renders when receiving null value', () => {
      renderComponent({ name: 'language', multi: true, options: languages, values: null })

      expect(screen.getByTestId('react-clean-select-language-Content').textContent).toEqual('')
    })

    it('safely renders when receiving undefined value', () => {
      renderComponent({ name: 'language', multi: true, options: languages, values: undefined })

      expect(screen.getByTestId('react-clean-select-language-Content').textContent).toEqual('')
    })
  })
})
