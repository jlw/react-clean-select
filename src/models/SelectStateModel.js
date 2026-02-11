import PropTypes from 'prop-types'

const SelectStateModel = Object.freeze({
  /**
   * Cursor position
   */
  cursor: PropTypes.number,
  /**
   * Flag indicating whether the dropdown is open or closed
   */
  dropdown: PropTypes.bool.isRequired,
  /**
   * Search string
   */
  search: PropTypes.string.isRequired,
  /**
   * Array of search results
   */
  searchResults: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Array of bounds for the select component
   */
  selectBounds: PropTypes.shape({}),
  /**
   * Array of selected values
   */
  values: PropTypes.arrayOf(PropTypes.shape({}))
})

export default SelectStateModel
