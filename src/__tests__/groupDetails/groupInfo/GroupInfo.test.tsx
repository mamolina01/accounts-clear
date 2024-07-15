import { render, screen } from '@testing-library/react'
import { GroupDetail } from '@/types/groupDetail'
import { GroupInfo } from '@/components/groupDetails/groupInfo/GroupInfo'
import { Routes } from '@/enums/routes'

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

jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
  Link.displayName = 'Link'
  return Link
})

describe('GroupInfo component', () => {
  beforeEach(() => {
    render(<GroupInfo group={mockGroup} />)
  })

  test('renders group information correctly', () => {
    expect(screen.getByText(/Group 1/i)).toBeInTheDocument()
    expect(screen.getByText(/This is a test group/i)).toBeInTheDocument()
  })

  test('test href link', () => {
    const link = screen.getAllByRole('link')

    expect(link[1]).toBeTruthy()

    expect(link[1]).toHaveAttribute('href', `${Routes.COST_FORM}/${mockGroup.id}`)
  })
})
