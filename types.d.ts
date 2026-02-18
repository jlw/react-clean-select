declare module 'react-clean-select' {
  import {
    ChangeEvent,
    CSSProperties,
    HTMLAttributes,
    KeyboardEvent,
    MouseEvent,
    PropsWithRef,
    RefObject
  } from 'react';

  export interface SetStateFnArgs<T> {
    activeCursorOption?: any;
    cursor?: number | null;
    dropdown?: boolean;
    search?: string;
    selectBounds?: DOMRect | {};
    values?: T[];
  }

  export interface SelectState<T> {
    cursor: number;
    dropdown: boolean;
    search: string;
    selectBounds: object;
    values: T[];
  }

  export interface SelectMethods<T> {
    activeCursorOption: (activeCursorOption: any) => void;
    addOption: (option: T) => void;
    areAllSelected: () => boolean;
    clearAll: () => void;
    dropDown: (action: string, event?: MouseEvent<HTMLElement> | null) => void;
    getInputSize: () => number;
    getSelectBounds: () => {} | DOMRect;
    getSelectRef: () => HTMLDivElement;
    handleKeyUp: (event: KeyboardEvent) => void;
    isSelected: (option: T) => boolean;
    removeOption: (event: MouseEvent<HTMLElement> | null, option: T, close: boolean) => void;
    safeString: (input: string) => string;
    searchResults: () => T[];
    selectAll: () => void;
    setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    sortBy: () => T[];
    toggleSelectAll: () => void;
  }

  export interface SelectRenderer<T> {
    methods: SelectMethods<T>;
    props: SelectProps<T>;
    state: SelectState<T>;
  }

  export interface SelectOnDropdownCloseRequest<T> {
    close: () => void;
    methods: SelectMethods<T>;
    props: SelectProps<T>;
    state: SelectState<T>;
  }

  export interface SelectKeyUp<T> {
    event: KeyboardEvent;
    methods: SelectMethods<T>;
    props: SelectProps<T>;
    setState: (
      setter: ((args: SetStateFnArgs<T>) => SetStateFnArgs<T>) | SetStateFnArgs<T>
    ) => void;
    state: SelectState<T>;
  }

  export interface SelectOptionRenderer<T> {
    methods: SelectMethods<T>;
    option: T;
    optionIndex?: number;
    props: SelectProps<T>;
    state: SelectState<T>;
  }

  export interface SelectProps<T> {
    additionalProps?: HTMLAttributes<HTMLDivElement>;
    addPlaceholder?: string;
    backspaceDelete?: boolean;
    className?: string;
    clearable?: boolean;
    clearAllLabel?: string;
    clearOnBlur?: boolean;
    clearOnSelect?: boolean;
    clearRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    closeOnClickInput?: boolean;
    closeOnScroll?: boolean;
    closeOnSelect?: boolean;
    contentRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    debounceDelay?: number;
    defaultMenuIsOpen?: boolean;
    direction?: 'ltr' | 'rtl';
    disabled?: boolean;
    disabledLabel?: string;
    dropdownGap?: number;
    dropdownHandle?: boolean;
    dropdownHandleRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    dropdownHeight?: string;
    dropdownPosition?: 'top' | 'bottom' | 'auto';
    dropdownRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    handleKeyUpFn?: ({ event, props, state, methods, setState }: SelectKeyUp<T>) => void;
    inputRenderer?: ({
      props,
      state,
      methods
    }: SelectRenderer<T>) => JSX.Element;
    instructionsOption?: string;
    keepOpen?: boolean;
    keepSelectedInList?: boolean;
    labelField?: string;
    loading?: boolean;
    loadingRenderer?: ({ props }: SelectOptionRenderer<T>) => JSX.Element;
    multi?: boolean;
    name?: string;
    noDataLabel?: string;
    noDataRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    onBlur?: () => void;
    onChange: (value: T[]) => void;
    onClearAll?: () => void;
    onDeselect?: (value: T[]) => void;
    onDropdownClose?: () => void;
    onDropdownCloseRequest?: ({
      props,
      state,
      methods,
      close
    }: SelectOnDropdownCloseRequest<T>) => T[];
    onDropdownOpen?: () => void;
    onSelect?: (value: T[]) => void;
    onSelectAll?: () => void;
    optionRenderer?: ({
      option,
      optionIndex,
      props,
      state,
      methods
    }: SelectOptionRenderer<T>) => JSX.Element;
    options: T[];
    placeholder?: string;
    required?: boolean;
    searchable?: boolean;
    searchBy?: string;
    searchFn?: ({ props, state, methods }: SelectRenderer<T>) => T[];
    selectAll?: boolean;
    selectAllLabel?: string;
    selectionRenderer?: ({ option, props, state, methods }: SelectOptionRenderer<T>) => JSX.Element;
    separator?: boolean;
    separatorRenderer?: ({ props, state, methods }: SelectRenderer<T>) => JSX.Element;
    sortBy?: string;
    valueField?: string;
    values: T[];
    wrapperClassName?: string;
  }

  export interface DropDownProps {
    dropdownGap: number;
    dropdownHeight: string;
    dropdownPosition: 'auto' | 'top' | 'bottom';
    selectBounds: DOMRect;
  }

  const Select: <T extends object | string = {}>(
    props: PropsWithRef<SelectProps<T>>
  ) => JSX.Element;
  export default Select;
}
