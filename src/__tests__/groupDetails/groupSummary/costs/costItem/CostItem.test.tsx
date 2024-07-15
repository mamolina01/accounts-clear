import { CostItem } from '@/components/groupDetails/groupSummary/costs/costItem/CostItem'
import { Cost } from '@/types/groupDetail'
import { fireEvent, getByRole, render, screen } from '@testing-library/react'
import { debug } from 'console'

describe('CostItem test', () => {
  const mockData: Cost = {
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

  const groupId = '123'

  beforeEach(() => {
    render(<CostItem cost={mockData} groupId={groupId} />)
  })

  test('render CostItem component', () => {
    expect(screen.getByText('Drinks')).toBeInTheDocument()
    expect(screen.getByText('$4000')).toBeInTheDocument()
  })

  test('toggleShowMore', () => {
    const arrowIcon = screen.getByRole('button', { name: /toggle showMore/i })
    fireEvent.click(arrowIcon)
    const text = screen.getByText('For 2 participants:')
    expect(text).toBeTruthy()
    fireEvent.click(arrowIcon)
    expect(text).not.toBeInTheDocument()
  })

  test('render participants name', () => {
    const arrowIcon = screen.getByRole('button', { name: /toggle showMore/i })
    fireEvent.click(arrowIcon)
    expect(screen.getByText('Juan', { selector: 'li p' })).toBeInTheDocument()
    expect(screen.getByText('Pedro', { selector: 'li p' })).toBeInTheDocument()

    fireEvent.click(arrowIcon)
    expect(screen.queryByText('Juan', { selector: 'li p' })).not.toBeInTheDocument()
    expect(screen.queryByText('Pedro', { selector: 'li p' })).not.toBeInTheDocument()
  })
})
