import PropTypes from 'prop-types';

const SelectMethodsModel = Object.freeze({
  activeCursorOption: PropTypes.func,
  /**
   * Add a new option
   */
  addOption: PropTypes.func.isRequired,
  /**
   * Check if all options are selected
   */
  areAllSelected: PropTypes.func.isRequired,
  /**
   * Clear all selected options
   */
  clearAll: PropTypes.func.isRequired,
  /**
   * Create a new option
   */
  createNew: PropTypes.func.isRequired,
  /**
   * Close/Toggle/Open
   */
  dropDown: PropTypes.func.isRequired,
  /**
   * Get the input size
   */
  getInputSize: PropTypes.func.isRequired,
  /**
   * Get the bounds of the select component
   */
  getSelectBounds: PropTypes.func.isRequired,
  /**
   * Get the reference to the select component
   */
  getSelectRef: PropTypes.func.isRequired,
  /**
   * Handle key down event
   */
  handleKeyDown: PropTypes.func.isRequired,
  /**
   * Check if an option is selected
   */
  isSelected: PropTypes.func.isRequired,
  /**
   * Remove an option
   */
  removeOption: PropTypes.func.isRequired,
  /**
   * Make a string safe
   */
  safeString: PropTypes.func.isRequired,
  /**
   * Get search results
   */
  searchResults: PropTypes.func.isRequired,
  /**
   * Select all options
   */
  selectAll: PropTypes.func.isRequired,
  /**
   * Set the search string
   */
  setSearch: PropTypes.func.isRequired,
  /**
   * Sort options
   */
  sortBy: PropTypes.func.isRequired,
  /**
   * Toggle select all
   */
  toggleSelectAll: PropTypes.func.isRequired,
});

export default SelectMethodsModel;
