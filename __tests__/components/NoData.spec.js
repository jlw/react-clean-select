/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import NoData from 'components/NoData'

const defaultProps = {
  name: 'something',
  noDataLabel: 'No data',
  noDataRenderer: null
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

describe('<NoData />', () => {
  const renderComponent = (opts = {}) => render(<NoData {...compileProps(opts)} />)

  it('renders the default component', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-NoData')).toHaveTextContent('No data')
  })

  it('supports custom content', () => {
    renderComponent({ props: { noDataLabel: '¡Nada aquî!' } })

    expect(screen.getByTestId('react-clean-select-something-NoData')).toHaveTextContent('¡Nada aquî!')
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { noDataRenderer: () => (<div data-testid='foo' />) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-NoData')).toHaveLength(0)
  })
})
