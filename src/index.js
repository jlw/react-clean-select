import React, { Component } from 'react'
import ClickOutside from './components/ClickOutside'

import Content from './components/Content'
import Dropdown from './components/Dropdown'
import Loading from './components/Loading'
import Clear from './components/Clear'
import Separator from './components/Separator'
import DropdownHandle from './components/DropdownHandle'

import {
  debounce,
  isEqual,
  getProp,
  isomorphicWindow
} from './util'
import { LIB_NAME } from './constants'
import SelectPropsModel from './models/SelectPropsModel'

export class Select extends Component {
  static propTypes = SelectPropsModel

  constructor (props) {
    if (!{}.hasOwnProperty.call(props, 'name')) {
      props.name = `field${Math.floor(Math.random() * 1000)}`
    }
    super(props)

    this.state = {
      dropdown: false,
      values: props.values,
      search: '',
      selectBounds: {},
      cursor: null,
      searchResults: props.options
    }

    this.methods = {
      activeCursorOption: this.activeCursorOption,
      addOption: this.addOption,
      areAllSelected: this.areAllSelected,
      clearAll: this.clearAll,
      dropDown: this.dropDown,
      getInputSize: this.getInputSize,
      getSelectBounds: this.getSelectBounds,
      getSelectRef: this.getSelectRef,
      getValue: this.getValue,
      handleKeyDown: this.handleKeyDown,
      isSelected: this.isSelected,
      removeOption: this.removeOption,
      safeString: this.safeString,
      searchExistsInOptions: this.searchExistsInOptions,
      searchResults: this.searchResults,
      selectAll: this.selectAll,
      selectedOptions: this.selectedOptions,
      setSearch: this.setSearch,
      sortBy: this.sortBy,
      toggleSelectAll: this.toggleSelectAll
    }

    this.select = React.createRef()
    this.dropdownRoot = typeof document !== 'undefined' && document.createElement('div')
  }

  componentDidMount () {
    isomorphicWindow().addEventListener('resize', debounce(this.updateSelectBounds))
    isomorphicWindow().addEventListener('scroll', debounce(this.onScroll))

    if (this.select) {
      this.updateSelectBounds()
    }
    if (this.props.defaultMenuIsOpen) {
      this.dropDown('open')
    } else {
      this.dropDown('close')
    }
    this.setState({ searchResults: this.searchResults() })
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      !this.props.compareValuesFunc(prevProps.values, this.props.values) &&
      this.props.compareValuesFunc(prevProps.values, prevState.values)
    ) {
      this.setState(
        {
          values: this.props.values
        },
        () => {
          this.props.onChange(this.state.values)
        }
      )
      this.updateSelectBounds()
    }

    if (prevProps.options !== this.props.options) {
      this.setState({ searchResults: this.searchResults() })
    }

    if (prevState.values !== this.state.values) {
      this.props.onChange(this.state.values)
      this.updateSelectBounds()
    }

    if (prevState.search !== this.state.search) {
      this.updateSelectBounds()
    }

    if (prevProps.multi !== this.props.multi) {
      this.updateSelectBounds()
    }

    if (prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.onDropdownClose()
    }

    if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.props.onDropdownOpen()
    }
  }

  componentWillUnmount () {
    isomorphicWindow().removeEventListener(
      'resize',
      debounce(this.updateSelectBounds, this.props.debounceDelay)
    )
    isomorphicWindow().removeEventListener(
      'scroll',
      debounce(this.onScroll, this.props.debounceDelay)
    )
  }

  onDropdownClose = () => {
    this.setState({ cursor: null })
    this.props.onDropdownClose()
  }

  onScroll = () => {
    if (this.props.closeOnScroll) {
      this.dropDown('close')
    }

    this.updateSelectBounds()
  }

  updateSelectBounds = () =>
    this.select.current &&
    this.setState({
      selectBounds: this.select.current.getBoundingClientRect()
    })

  getSelectBounds = () => this.state.selectBounds

  dropDown = (action = 'toggle', force = false) => {
    if (this.props.keepOpen) {
      if (this.state.dropdown !== true) { this.setState({ dropdown: true }) }
      return
    }

    if (
      this.props.onDropdownCloseRequest !== undefined &&
      this.state.dropdown &&
      force === false &&
      action === 'close'
    ) {
      return this.props.onDropdownCloseRequest({
        props: this.props,
        methods: this.methods,
        state: this.state,
        close: () => this.dropDown('close', true)
      })
    }

    if (action === 'close' && this.state.dropdown) {
      this.select.current.blur()

      this.setState({
        dropdown: false,
        search: this.props.clearOnBlur ? '' : this.state.search
      })
      return this.setState({ searchResults: this.searchResults() })
    }

    if (action === 'open' && !this.state.dropdown) {
      return this.setState({ dropdown: true })
    }

    if (action === 'toggle') {
      this.select.current.focus()
      return this.setState({ dropdown: !this.state.dropdown })
    }

    return false
  }

  getSelectRef = () => this.select.current

  getValue = (option) => option[this.props.valueField]

  searchExistsInOptions = () => !!this.props.options.find((option) => this.state.search === this.getValue(option))

  addOption = (option) => {
    const pendingState = {}
    const addValue = this.getValue(option)
    if (this.props.multi) {
      if (this.state.values.includes(addValue)) {
        return this.removeOption(null, option, false)
      }

      pendingState.values = [...this.state.values, addValue]
      this.props.onSelect([...this.state.values, addValue])
    } else {
      pendingState.values = [addValue]
      this.props.onSelect([addValue])
    }

    if (this.props.clearOnSelect) {
      pendingState.search = ''
    }
    if (this.props.closeOnSelect || !this.props.multi) {
      pendingState.cursor = null
      pendingState.dropdown = false
    }
    this.setState(pendingState)

    return true
  }

  removeOption = (event, option, close = false) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }
    const removeValue = this.getValue(option)
    const values = this.state.values.filter((value) => value !== removeValue)
    this.setState({
      dropdown: !close,
      values
    })
    this.props.onDeselect(values)
  }

  setSearch = (event) => {
    this.setSearchState(event.target.value)
  }

  setSearchState = (searchValue) => {
    this.setState(
      { cursor: null, search: searchValue },
      () => this.setState({ searchResults: this.searchResults() })
    )
  }

  getInputSize = () => {
    if (this.state.search) {
      return this.state.search.length
    }

    if (this.state.values.length > 0) {
      return this.props.addPlaceholder.length
    }

    return this.props.placeholder.length
  }

  toggleSelectAll = () => {
    return this.setState({
      values: this.state.values.length === 0 ? this.selectAll() : this.clearAll()
    })
  }

  clearAll = () => {
    this.props.onClearAll()
    this.setState({
      values: []
    })
  }

  selectAll = () => {
    this.props.onSelectAll()
    this.setState({ values: this.props.options.filter((option) => !option.disabled).map((option) => this.getValue(option)) })
  }

  isSelected = (option) => this.state.values.includes(this.getValue(option))

  areAllSelected = () =>
    this.state.values.length === this.props.options.filter((option) => !option.disabled).length

  selectedOptions = () => this.props.options.filter((option) => this.isSelected(option))

  safeString = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  sortBy = () => {
    const { sortBy, options } = this.props

    if (!sortBy) {
      return options
    }

    options.sort((a, b) => {
      if (getProp(a, sortBy) < getProp(b, sortBy)) {
        return -1
      } else if (getProp(a, sortBy) > getProp(b, sortBy)) {
        return 1
      } else {
        return 0
      }
    })

    return options
  }

  searchFn = ({ state, methods }) => {
    const regexp = new RegExp(methods.safeString(state.search), 'i')

    return methods
      .sortBy()
      .filter((option) =>
        regexp.test(option[this.props.searchBy] || option[this.props.labelField])
      )
  }

  searchResults = () => {
    const args = { state: this.state, props: this.props, methods: this.methods }
    const rawSearchResults = this.props.searchFn(args) || this.searchFn(args)

    if (this.props.multi && !this.props.keepSelectedInList) {
      return rawSearchResults.filter((option) => !this.methods.isSelected(option))
    }

    return rawSearchResults
  }

  activeCursorOption = (activeCursorOption) =>
    this.setState({
      activeCursorOption
    })

  handleKeyDown = (event) => {
    const args = {
      event,
      state: this.state,
      props: this.props,
      methods: this.methods,
      setState: this.setState.bind(this)
    }

    return this.props.handleKeyDownFn(args) || this.handleKeyDownFn(args)
  }

  handleKeyDownFn = ({ event, state, props, methods, setState }) => {
    const { cursor, searchResults } = state
    const escape = event.key === 'Escape'
    const enter = event.key === 'Enter'
    const arrowUp = event.key === 'ArrowUp'
    const arrowDown = event.key === 'ArrowDown'
    const backspace = event.key === 'Backspace'
    const tab = event.key === 'Tab' && !event.shiftKey
    const shiftTab = event.shiftKey && event.key === 'Tab'

    if (escape) {
      return this.dropDown('close')
    }

    if (enter) {
      const currentOption = searchResults[cursor]
      if (currentOption && !currentOption.disabled) {
        if (props.multi && !props.keepSelectedInList && cursor > 0) {
          setState({ cursor: cursor - 1 })
        }
        return methods.addOption(currentOption)
      }
    }

    if (arrowUp || arrowDown || (shiftTab && state.dropdown) || (tab && state.dropdown)) {
      event.preventDefault()
    }

    if ((arrowDown || arrowUp) && !state.dropdown) {
      this.dropDown('open')
      return setState({
        cursor: arrowDown ? 0 : searchResults.length - 1
      })
    }

    if ((arrowDown || (tab && state.dropdown)) && (cursor === null || searchResults.length - 1 === cursor)) {
      setState({
        cursor: 0
      })
    } else if (arrowDown || (tab && state.dropdown)) {
      setState({
        cursor: cursor + 1
      })
    } else if ((arrowUp || (shiftTab && state.dropdown)) && (cursor === null || cursor === 0)) {
      setState({
        cursor: searchResults.length - 1
      })
    } else if ((arrowUp || (shiftTab && state.dropdown)) && cursor > 0) {
      setState({
        cursor: cursor - 1
      })
    } else if (backspace && props.backspaceDelete && this.getInputSize() === 0) {
      setState({
        values: this.state.values.slice(0, -1)
      })
    }
  }

  renderDropdown = () => (<Dropdown props={this.props} state={this.state} methods={this.methods} />)

  render () {
    const classNames = [LIB_NAME]
    if (this.props.direction === 'rtl') { classNames.push(`${LIB_NAME}-rtl`) }
    if (this.props.disabled) { classNames.push(`${LIB_NAME}-disabled`) }
    if (this.props.className !== undefined) { classNames.push(this.props.className) }

    return (
      <ClickOutside props={this.props} onClickOutside={() => this.dropDown('close')}>
        <div
          aria-expanded={this.state.dropdown}
          aria-label='Dropdown select'
          className={classNames.join(' ')}
          data-testid={`${LIB_NAME}-${this.props.name}`}
          onClick={(event) => { event.stopPropagation(); this.dropDown('open') }}
          onKeyDown={this.handleKeyDown}
          ref={this.select}
          tabIndex={this.props.disabled ? '-1' : '0'}
          {...this.props.additionalProps}
        >
          <Content props={this.props} state={this.state} methods={this.methods} />

          {this.props.loading && <Loading props={this.props} />}

          {this.props.clearable && (
            <Clear props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.separator && (
            <Separator props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.dropdownHandle && (
            <DropdownHandle
              props={this.props}
              state={this.state}
              methods={this.methods}
            />
          )}

          {this.state.dropdown && !this.props.disabled && this.renderDropdown()}
        </div>
      </ClickOutside>
    )
  }
}

Select.defaultProps = {
  additionalProps: null,
  addPlaceholder: '',
  autoFocus: false,
  backspaceDelete: true,
  clearable: false,
  clearAllLabel: 'Clear all',
  clearOnBlur: true,
  clearOnSelect: true,
  closeOnClickInput: false,
  closeOnScroll: false,
  closeOnSelect: false,
  compareValuesFunc: isEqual,
  debounceDelay: 0,
  defaultMenuIsOpen: false,
  direction: 'ltr',
  disabled: false,
  disabledLabel: 'disabled',
  dropdownGap: 5,
  dropdownHandle: true,
  dropdownHeight: '300px',
  dropdownPosition: 'bottom',
  handleKeyDownFn: () => undefined,
  keepOpen: false,
  keepSelectedInList: true,
  labelField: 'label',
  loading: false,
  multi: false,
  name: null,
  noDataLabel: 'No data',
  onChange: () => undefined,
  onClearAll: () => undefined,
  onDeselect: () => undefined,
  onDropdownClose: () => undefined,
  onDropdownCloseRequest: undefined,
  onDropdownOpen: () => undefined,
  onSelect: () => undefined,
  onSelectAll: () => undefined,
  options: [],
  pattern: undefined,
  placeholder: 'Select...',
  required: false,
  searchable: true,
  searchBy: 'label',
  searchFn: () => undefined,
  selectAll: false,
  selectAllLabel: 'Select all',
  separator: false,
  sortBy: null,
  valueField: 'value',
  values: []
}

export default Select
