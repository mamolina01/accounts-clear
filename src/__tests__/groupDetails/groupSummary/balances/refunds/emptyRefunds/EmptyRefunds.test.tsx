import { EmptyRefunds } from '@/components/groupDetails/groupSummary/balances/refunds/emptyRefunds/EmptyRefunds'
import { render, screen } from '@testing-library/react'

describe('EmptyRefunds', () => {
  test('Render No necessary refunds', () => {
    render(<EmptyRefunds />)

    const img = screen.getByRole('img')
    const text = screen.getByText('No necessary refunds')
    
    expect(img).toBeTruthy()
    expect(text).toBeTruthy()
  })
})
