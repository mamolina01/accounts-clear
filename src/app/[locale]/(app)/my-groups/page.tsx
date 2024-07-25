import { getGroupListByUserId } from '@/actions/groups/get-group-list-by-userId'
import { GroupList } from '@/components/groupList/GroupList'
import { Metadata } from 'next'

interface Props {
  id: string
  name: string
  description: string
}

export function generateMetadata(): Metadata {
  return {
    title: 'My groups',
    description: 'Groups list'
  }
}

export default async function Groups() {
  // TODO: Order by date
  const groups: Props[] = await getGroupListByUserId()
  return <GroupList groups={groups} />
}
