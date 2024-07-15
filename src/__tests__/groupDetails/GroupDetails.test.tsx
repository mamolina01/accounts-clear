import { render } from '@testing-library/react'
import { GroupDetail } from '@/types/groupDetail'
import { GroupDetails } from '@/components/groupDetails/GroupDetails'

jest.mock('../../components/groupDetails/groupInfo/GroupInfo', () => ({
  GroupInfo: ({ group }: { group: GroupDetail }) => <div data-testid="group-info">{group.name}</div>
}))

jest.mock('../../components/groupDetails/groupSummary/GroupSummary', () => ({
  GroupSummary: ({ group }: { group: GroupDetail }) => <div data-testid="group-summary">{group.description}</div>
}))

describe('GroupDetails', () => {
  const group = {
    id: '1',
    name: 'Test Group',
    description: 'This is a test group',
    total: 100,
    category: 'Test Category',
    participants: [],
    costs: []
  }

  test('should render GroupInfo and GroupSummary with the correct props', () => {
    const { getByTestId } = render(<GroupDetails group={group} />)

    expect(getByTestId('group-info')).toHaveTextContent('Test Group')
    expect(getByTestId('group-summary')).toHaveTextContent('This is a test group')
  })
})
