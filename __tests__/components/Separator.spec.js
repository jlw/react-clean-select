/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Separator from 'components/Separator'

const defaultProps = {
  name: 'something',
  separatorRenderer: null
}
const defaultState = {}
const defaultMethods = {}

const compileProps = ({ props = {}, state = {}, methods = {} }) => {
  return {
    props: { ...defaultProps, ...props },
    state: { ...defaultState, ...state },
    methods: { ...defaultMethods, ...methods }
  }
}

describe('<Separator />', () => {
  const renderComponent = (opts = {}) => render(<Separator {...compileProps(opts)} />)

  it('supports a custom renderer', () => {
    renderComponent({ props: { separatorRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Separator')).toHaveLength(0)
  })
})
