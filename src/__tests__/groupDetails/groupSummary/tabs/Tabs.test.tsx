import React from 'react'
import { render } from '@testing-library/react'
import { Tabs } from '@/components/groupDetails/groupSummary/tabs/Tabs'
import userEvent from '@testing-library/user-event'

describe('Tabs Component', () => {
  test('renders tabs with correct active state', async () => {
    // Arrange
    const setTabActive = jest.fn() // Mock función para cambiar el estado de la pestaña activa
    const { getByRole } = render(<Tabs tabActive="costs" setTabActive={setTabActive} />)

    // Act
    const costsTab = getByRole('button', { name: /costs/i })
    const balanceTab = getByRole('button', { name: /balance/i })

    // Assert
    expect(costsTab).toHaveClass('active') // Verificar que la pestaña 'Costs' esté activa por defecto
    expect(balanceTab).not.toHaveClass('active') // Verificar que la pestaña 'Balance' no esté activa por defecto

    // Act: Simular clic en la pestaña 'Balance'
    await userEvent.click(balanceTab)

    // Assert
    expect(setTabActive).toHaveBeenCalledWith('balance') // Verificar que la función `setTabActive` se llama con 'balance' al hacer clic en la pestaña 'Balance'
    expect(costsTab.classList.contains('active')).toBe(true)
    expect(balanceTab).toHaveClass('active') // Verificar que la clase 'active' se ha añadido a la pestaña 'Balance'
  })
})
