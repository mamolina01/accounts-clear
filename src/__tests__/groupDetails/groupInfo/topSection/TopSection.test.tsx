import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Routes } from '@/enums/routes'
import { TopSection } from '@/components/groupDetails/groupInfo/topSection/TopSection'

const mockGroup = {
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
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('TopSection component', () => {
  it('renders group name and back button correctly', () => {
    render(<TopSection group={mockGroup} />)

    expect(screen.getByText(/Group 1/i)).toBeInTheDocument()

    const backButton = screen.getByRole('link')
    expect(backButton).toBeInTheDocument()
    expect(backButton.querySelector('svg')).toBeInTheDocument()

    userEvent.click(backButton)

    expect(backButton.getAttribute('href')).toBe(Routes.GROUPS)
  })
})
