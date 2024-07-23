import { getGroupListByUserId } from '@/actions/groups/get-group-list-by-userId'
import { GroupList } from '@/components/groupList/GroupList'

interface Props {
  id: string
  name: string
  description: string
}
export default async function Groups() {
  // TODO: Order by date
  const groups: Props[] = await getGroupListByUserId()
  return <GroupList groups={groups} />
}
