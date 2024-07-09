import { EmptyCosts } from '@/components/groupDetails/groupSummary/costs/emptyCosts/EmptyCosts'
import { Routes } from '@/enums/routes'
import { render, screen } from '@testing-library/react'

describe('Testing emptyCosts', () => {
  const groupId = '123'

  beforeEach(() => {
    render(<EmptyCosts groupId={groupId} />)
  })

  test('test href link', () => {
    const link = screen.getByRole('link')

    expect(link).toBeTruthy()

    expect(link).toHaveAttribute('href', `${Routes.COST_FORM}/${groupId}`)
  })

  test('test image', () => {
    const image = screen.getByRole('img')
    expect(image).toBeTruthy()
  })

  test('text', () => {
    const text = screen.getByRole('paragraph')
    expect(text).toBeTruthy()
    expect(text).toHaveTextContent('Add your first cost')
  })
})
