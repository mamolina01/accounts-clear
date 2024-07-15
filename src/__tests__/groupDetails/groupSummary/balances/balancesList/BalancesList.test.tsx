import React from 'react'
import { render, screen } from '@testing-library/react'
import styles from './BalancesList.module.scss'
import { BalancesList } from '@/components/groupDetails/groupSummary/balances/balancesList/BalancesList'

describe('BalancesList', () => {
  const mockBalances = [
    { id: '1', name: 'Alice', total: -50.75 },
    { id: '2', name: 'Bob', total: 20.5 },
    { id: '3', name: 'Charlie', total: 0 }
  ]

  test('renders the correct number of participants', () => {
    render(<BalancesList balance={mockBalances} />)
    const balanceElements = screen.getAllByTestId(/balance/i)
    expect(balanceElements).toHaveLength(mockBalances.length)
  })

  test('displays the correct balance values', () => {
    render(<BalancesList balance={mockBalances} />)
    expect(screen.getByText('- $50.75')).toBeInTheDocument()
    expect(screen.getByText('+ $20.50')).toBeInTheDocument()
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  test('applies the correct styles based on the balance value', () => {
    render(<BalancesList balance={mockBalances} />)

    const aliceName = screen.getByText('Alice')
    const bobName = screen.getByText('Bob')
    const charlieName = screen.getByText('Charlie')

    expect(aliceName).toHaveClass(styles.rightText)
    expect(bobName).toHaveClass(styles.leftText)
    expect(charlieName).toHaveClass(styles.leftText)

    const aliceTotal = screen.getByText('- $50.75')
    const bobTotal = screen.getByText('+ $20.50')
    const charlieTotal = screen.getByText('$0.00')

    expect(aliceTotal).toHaveClass(styles.leftTotal)
    expect(bobTotal).toHaveClass(styles.rightTotal)
    expect(charlieTotal).not.toHaveClass(styles.rightTotal)
    expect(charlieTotal).not.toHaveClass(styles.leftTotal)
  })
})
