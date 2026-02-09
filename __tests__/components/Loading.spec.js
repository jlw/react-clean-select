/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Loading from 'components/Loading'

const defaultProps = {
  loadingRenderer: null,
  name: 'something'
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

describe('<Loading />', () => {
  const renderComponent = (opts = {}) => render(<Loading {...compileProps(opts)} />)

  it('renders the default component', () => {
    renderComponent()

    expect(screen.getByTestId('react-clean-select-something-Loading')).toBeInTheDocument()
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { loadingRenderer: () => (<div data-testid='foo'>...</div>) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Loading')).toHaveLength(0)
  })
})
