import { fireEvent, render } from '@testing-library/react'
import { Tabs } from '@/components/groupDetails/groupSummary/tabs/Tabs'

describe('Tabs Component', () => {
  test('renders tabs with correct active state', () => {
    const setTabActive = jest.fn()
    const { getByText, rerender } = render(<Tabs tabActive="costs" setTabActive={setTabActive} />)

    const costsTab = getByText('Costs')
    const balanceTab = getByText('Balance')

    expect(costsTab.parentNode).toHaveClass('active')
    expect(balanceTab.parentNode).not.toHaveClass('active')

    fireEvent.click(balanceTab)

    expect(setTabActive).toHaveBeenCalledWith('balance')
    expect(setTabActive).toHaveBeenCalledTimes(1)

    rerender(<Tabs tabActive="balance" setTabActive={setTabActive} />)

    expect(costsTab.parentNode).not.toHaveClass('active')
    expect(balanceTab.parentNode).toHaveClass('active')
  })
})
