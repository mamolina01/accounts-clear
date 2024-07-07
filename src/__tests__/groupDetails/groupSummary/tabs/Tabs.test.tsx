import React, { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Tabs } from '@/components/groupDetails/groupSummary/tabs/Tabs'

describe('Tabs Component', () => {
  test('renders tabs with correct active state', async () => {
    // Arrange
    const setTabActive = jest.fn() // Mock función para cambiar el estado de la pestaña activa
    const { getByText, rerender } = render(<Tabs tabActive="costs" setTabActive={setTabActive} />)

    // Act
    const costsTab = getByText('Costs')
    const balanceTab = getByText('Balance')

    // Assert
    expect(costsTab.parentNode).toHaveClass('active') // Verificar que la pestaña 'Costs' esté activa por defecto
    expect(balanceTab.parentNode).not.toHaveClass('active') // Verificar que la pestaña 'Balance' no esté activa por defecto

    // Act: Simular clic en la pestaña 'Balance'
    fireEvent.click(balanceTab)

    // Assert
    expect(setTabActive).toHaveBeenCalledWith('balance') // Verificar que la función `setTabActive` se llama con 'balance' al hacer clic en la pestaña 'Balance'
    expect(setTabActive).toHaveBeenCalledTimes(1)

    // Update the state manually
    rerender(<Tabs tabActive="balance" setTabActive={setTabActive} />)

    expect(costsTab.parentNode).not.toHaveClass('active')
    expect(balanceTab.parentNode).toHaveClass('active') // Verificar que la clase 'active' se ha añadido a la pestaña 'Balance'
  })
})
