import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GroupSummary } from '@/components/groupDetails/groupSummary/GroupSummary'
import { GroupDetail } from '@/types/groupDetail'

const groupWithCosts: GroupDetail = {
  id: '1',
  name: 'Group with Costs',
  description: 'This group has some costs.',
  total: 250,
  category: 'Food',
  participants: [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' }
  ],
  costs: [
    {
      id: '1',
      title: 'Dinner',
      date: new Date('2024-06-30'),
      amount: 150,
      paidBy: { id: '1', name: 'John Doe' },
      assignedUsers: [{ participant: { id: '1', name: 'John Doe' } }, { participant: { id: '2', name: 'Jane Smith' } }]
    },
    {
      id: '2',
      title: 'Lunch',
      date: new Date('2024-06-29'),
      amount: 100,
      paidBy: { id: '2', name: 'Jane Smith' },
      assignedUsers: [{ participant: { id: '2', name: 'Jane Smith' } }]
    }
  ]
}

const emptyCostGroup: GroupDetail = {
  id: '2',
  name: 'Empty Cost Group',
  description: 'This group has no costs.',
  total: 0,
  category: 'Miscellaneous',
  participants: [
    { id: '3', name: 'Michael Brown' },
    { id: '4', name: 'Emily Johnson' }
  ],
  costs: []
}

describe('GroupSummary Component', () => {
  test('renders EmptyCosts when costs are empty', () => {
    render(<GroupSummary group={emptyCostGroup} />)
    expect(screen.getByText(/Add your first cost/i)).toBeInTheDocument()
  })

  test('renders CostsList by default when costs are present', () => {
    render(<GroupSummary group={groupWithCosts} />)

    expect(screen.getByRole('button', { name: /costs/i })).toHaveClass('active')
    expect(screen.queryByRole('button', { name: /balances/i })).toBeNull() // Verifica que no se encuentre el elemento

    expect(screen.getByText('Dinner')).toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })

  test('switches tabs and renders Balances component when balances tab is clicked', () => {
    render(<GroupSummary group={groupWithCosts} />)

    fireEvent.click(screen.getByRole('button', { name: /balance/i }))

    expect(screen.queryByText('Dinner')).not.toBeInTheDocument()
    expect(screen.queryByText('Lunch')).not.toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  test('switches tabs using userEvent and renders correct content', async () => {
    render(<GroupSummary group={groupWithCosts} />)

    userEvent.click(screen.getByRole('button', { name: /balance/i }))

    await waitFor(() => {
      // After waiting, expect specific content to be absent or present
      expect(screen.queryByText('Dinner')).not.toBeInTheDocument()
      expect(screen.queryByText('Lunch')).not.toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })
})
