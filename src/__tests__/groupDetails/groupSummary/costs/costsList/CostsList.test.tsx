import React from 'react'
import { render } from '@testing-library/react'
import { GroupDetail } from '@/types/groupDetail'
import { CostsList } from '@/components/groupDetails/groupSummary/costs/costsList/CostsList'

describe('CostList', () => {
  // Mock data
  const mockGroup: GroupDetail = {
    id: 'group1',
    name: 'Group 1',
    description: 'This is a test group',
    total: 14000,
    category: 'Friends',
    participants: [
      { id: 'user1', name: 'Matias Molina' },
      { id: 'user2', name: 'Juan' },
      { id: 'user3', name: 'Pedro' }
    ],
    costs: [
      {
        id: 'cost1',
        title: 'Food',
        date: new Date('2024-07-01T14:21:44.669Z'),
        amount: 10000,
        paidBy: {
          id: 'user1',
          name: 'Matias Molina'
        },
        assignedUsers: [
          { participant: { id: 'user1', name: 'Matias Molina' } },
          { participant: { id: 'user2', name: 'Juan' } }
        ]
      },
      {
        id: 'cost2',
        title: 'Drinks',
        date: new Date('2024-07-01T18:35:35.919Z'),
        amount: 4000,
        paidBy: {
          id: 'user2',
          name: 'Juan'
        },
        assignedUsers: [{ participant: { id: 'user2', name: 'Juan' } }, { participant: { id: 'user3', name: 'Pedro' } }]
      }
    ]
  }

  test('renders CostsList component', () => {
    const { getByText } = render(<CostsList group={mockGroup} />)

    expect(getByText('Food')).toBeInTheDocument()
    expect(getByText('Drinks')).toBeInTheDocument()

    expect(getByText('$10000')).toBeInTheDocument()
    expect(getByText('$4000')).toBeInTheDocument()

    expect(getByText('Matias Molina')).toBeInTheDocument()
    expect(getByText('Juan')).toBeInTheDocument()
  })
})
