/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import Clear from 'components/Clear'

const defaultProps = {
  props: {
    clearRenderer: null,
    name: 'something'
  },
  methods: {
    clearAll: jest.fn()
  }
}

describe('<Clear />', () => {
  const renderComponent = (props = {}) => render(
    <Clear {...defaultProps} {...props} />
  )

  it('clears all on click', async () => {
    renderComponent()

    await fireEvent.click(screen.getByTestId('react-clean-select-something-Clear'))

    expect(defaultProps.methods.clearAll).toHaveBeenCalled()
  })

  it('clears all on keyDown', async () => {
    renderComponent()

    await fireEvent.keyDown(screen.getByTestId('react-clean-select-something-Clear'))

    expect(defaultProps.methods.clearAll).toHaveBeenCalled()
  })

  it('supports a custom renderer', () => {
    renderComponent({ props: { clearRenderer: () => (<div data-testid='foo'>x</div>) } })

    expect(screen.getByTestId('foo')).toBeInTheDocument()
    expect(screen.queryAllByTestId('react-clean-select-something-Clear')).toHaveLength(0)
  })
})
