import { Menu } from '@/components/groupDetails/groupSummary/costs/menu/Menu'
import { Routes } from '@/enums/routes'
import { useModalsStore } from '@/store'
import { fireEvent, render } from '@testing-library/react'

jest.mock('@/store', () => ({
  useModalsStore: jest.fn()
}))

const mockSetIsRemoveCostModalOpen = jest.fn()

;(useModalsStore as unknown as jest.Mock).mockReturnValue({
  setIsRemoveCostModalOpen: mockSetIsRemoveCostModalOpen
})

describe('Menu component', () => {
  const mock = { groupId: '123', costId: '222' }

  test('showMenu', () => {
    const { getByRole, getByTestId } = render(<Menu costId={mock.costId} groupId={mock.groupId} />)

    const toggleButton = getByRole('button', { name: /toggle menu/i })

    expect(toggleButton).toBeTruthy()

    fireEvent.click(toggleButton)
    const menu = getByTestId('menu')
    expect(menu).toBeTruthy()

    fireEvent.click(toggleButton)
    expect(menu).not.toBeInTheDocument()
  })

  test('editOption', () => {
    const { getByRole, getByTestId } = render(<Menu costId={mock.costId} groupId={mock.groupId} />)

    const toggleButton = getByRole('button', { name: /toggle menu/i })

    expect(toggleButton).toBeTruthy()

    fireEvent.click(toggleButton)
    const menu = getByTestId('menu')
    expect(menu).toBeTruthy()

    const editButton = getByRole('link', { name: /edit/i })
    expect(editButton).toHaveAttribute('href', `${Routes.COST_FORM}/${mock.groupId}/${mock.costId}`)

    fireEvent.click(editButton)
  })

  test('deleteOption', () => {
    const { getByRole, getByTestId } = render(<Menu costId={mock.costId} groupId={mock.groupId} />)

    const toggleButton = getByRole('button', { name: /toggle menu/i })

    expect(toggleButton).toBeTruthy()

    fireEvent.click(toggleButton)
    const menu = getByTestId('menu')
    expect(menu).toBeTruthy()

    const deleteButton = getByRole('button', { name: /delete/i })
    expect(deleteButton).toBeTruthy()

    fireEvent.click(deleteButton)

    expect(mockSetIsRemoveCostModalOpen).toHaveBeenCalledWith({
      id: mock.costId,
      state: true
    })
  })
})
