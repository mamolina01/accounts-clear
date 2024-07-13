import React from 'react'
import { render, screen } from '@testing-library/react'
import { Refunds } from '@/components/groupDetails/groupSummary/balances/refunds/Refunds'

jest.mock('@/components/groupDetails/groupSummary/balances/refunds/emptyRefunds/EmptyRefunds', () => ({
  EmptyRefunds: () => <div data-testid="empty-refunds">No refunds available</div>
}))

const mockRefunds = [
  {
    participantsToPay: [
      { to: 'Alice', amount: 50 },
      { to: 'Bob', amount: 75 }
    ],
    id: '1',
    name: 'John',
    total: 125
  },
  {
    participantsToPay: [{ to: 'Charlie', amount: 100 }],
    id: '2',
    name: 'David',
    total: 100
  }
]

describe('Refunds Component', () => {
  test('renders EmptyRefunds when no refunds are provided', () => {
    render(<Refunds refunds={[]} />)

    expect(screen.getByTestId('empty-refunds')).toBeInTheDocument()
  })

  test('renders refunds correctly', () => {
    render(<Refunds refunds={mockRefunds} />)

    // Check for participant names
    const johnElements = screen.getAllByText('John')
    expect(johnElements).toHaveLength(2)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('David')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()

    // Check for amounts
    expect(screen.getByText('$50')).toBeInTheDocument()
    expect(screen.getByText('$75')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
  })
})
