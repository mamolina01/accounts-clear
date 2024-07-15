import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TabsBalances } from '@/components/groupDetails/groupSummary/balances/tabsBalances/TabsBalances'

describe('TabsBalances', () => {
  test('renders Balances and Refunds buttons', () => {
    const setActiveTab = jest.fn()
    render(<TabsBalances activeTab="balances" setActiveTab={setActiveTab} />)

    expect(screen.getByText('Balances')).toBeInTheDocument()
    expect(screen.getByText('Refunds')).toBeInTheDocument()
  })

  test('activates Balances tab', () => {
    const setActiveTab = jest.fn()
    render(<TabsBalances activeTab="balances" setActiveTab={setActiveTab} />)

    const balancesButton = screen.getByText('Balances')
    fireEvent.click(balancesButton)

    expect(setActiveTab).toHaveBeenCalledWith('balances')
  })

  test('activates Refunds tab', () => {
    const setActiveTab = jest.fn()
    render(<TabsBalances activeTab="refunds" setActiveTab={setActiveTab} />)

    const refundsButton = screen.getByText('Refunds')
    fireEvent.click(refundsButton)

    expect(setActiveTab).toHaveBeenCalledWith('refunds')
  })

  test('applies active class to the correct tab', () => {
    const setActiveTab = jest.fn()
    const { rerender } = render(<TabsBalances activeTab="balances" setActiveTab={setActiveTab} />)

    expect(screen.getByText('Balances').parentElement).toHaveClass('active')
    expect(screen.getByText('Refunds').parentElement).not.toHaveClass('active')

    rerender(<TabsBalances activeTab="refunds" setActiveTab={setActiveTab} />)

    expect(screen.getByText('Refunds').parentElement).toHaveClass('active')
    expect(screen.getByText('Balances').parentElement).not.toHaveClass('active')
  })
})
