# Change Log

## [0.3.0 (2026-06-26)](https://github.com/jlw/react-clean-select/compare/v0.2.0...v0.3.0)

- Replace <ClickOutside /> with <Container /> relying on onBlur()
  - more than one field on the same page could cause havoc on each other with multiple selections
- DRY calling onSelect()


## [0.2.0 (2026-02-26)](https://github.com/jlw/react-clean-select/compare/v0.1.0...v0.2.0)

- Fix custom search function handling to allow for async code
  - extract logic for filtering and setting search results
  - use custom searchFn return value directly if it is an array
- Replace pattern of default functions returning undefined
  - check if prop is a function before calling it
- Add lodash as peer dependency to simplify identifying array vs. object
  - TODO: replace other custom code here with lodash
- Add default <input `autocomplete="off"`> and allow overrides


## [0.1.0 (2026-02-20)](https://github.com/jlw/react-clean-select/compare/v0.0.10...v0.1.0)

- Add allowFreeTextEntry option for single-select mode
  - accept anything the user types, treating options as mere suggestions
- Display selections from a customized searchFn even if not in options


## [0.0.10 (2026-02-18)](https://github.com/jlw/react-clean-select/compare/v0.0.9...v0.0.10)

- Remove tabindex from Input for expected form behavior
- Fix basic input focusing and blurring
- Fix tab to change fields and not move the option cursor
- Remove untested, questionable autofocus and onDropdownCloseRequest options


## [0.0.9 (2026-02-16)](https://github.com/jlw/react-clean-select/compare/v0.0.8...v0.0.9)

- No functional changes: ensuring NPM was published from the master branch


## [0.0.8 (2026-02-13)](https://github.com/jlw/react-clean-select/compare/v0.0.7...v0.0.8)

- Fix rendering NoData component (broken in 0.0.6)
- Add data-testid to ClickOutside container
- Support optional onBlur
- Safely handle single-select with unmatched value
- Only include the base input when field is marked as required
- Add data-testid on single-selection Content text
- Apply `<Option>` styles to `<NoData>` for mostly-matching presentation
- Safely handle null/undefined values


## [0.0.7 (2026-02-12)](https://github.com/jlw/react-clean-select/compare/v0.0.6...v0.0.7)

- Fix class name for selection clear widget
- Move name/required input into Content and use values
- Improve closing handling
- Remove battling open/close propogations
- Refactor values and fix bugs
  - convert `values` from `options` objects to value scalars
  - remove `getPath()` expecting un-nested option objects
  - fix search to match labels instead of values
  - test custom search property
  - remove un-tested code for creating new options


## [0.0.6 (2026-02-11)](https://github.com/jlw/react-clean-select/compare/v0.0.5...v0.0.6)

- Fix keyboard navigation for more scenarios
- Support non-selectable instructions option


## [0.0.5 (2026-02-10)](https://github.com/jlw/react-clean-select/compare/v0.0.4...v0.0.5)

- Fix keyboard navigation


## [0.0.4 (2026-02-09)](https://github.com/jlw/react-clean-select/compare/v0.0.3...v0.0.4)

- Fix link to forked react-dropdown-select
- Switch to JavaScript Standard Style
- Remove outdated docs
- Replace deprecated keypress event handling with keydown
- Replace low-value snapshots with meaningful tests
- Clarify how/when closeOnSelect works
- Remove px for zero CSS lengths


## [0.0.3 (2025-11-30)](https://github.com/jlw/react-clean-select/compare/v0.0.2...v0.0.3)

- Rename Option -> Selection and Item -> Option


## [0.0.2 (2025-11-29)](https://github.com/jlw/react-clean-select/compare/v0.0.1...v0.0.2)

- Add simple, static default CSS file
- Remove use of `@emotion/styled`
- Remove use of inline styles


## [0.0.1 (2025-11-29)](https://github.com/jlw/react-clean-select/releases/tag/v0.0.1)

- Fork from [react-dropdown-select](https://github.com/sanusart/react-dropdown-select) by Sasha Khamkov
