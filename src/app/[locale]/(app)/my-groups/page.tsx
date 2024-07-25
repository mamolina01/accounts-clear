import { getGroupListByUserId } from '@/actions/groups/get-group-list-by-userId'
import { GroupList } from '@/components/groupList/GroupList'
import { Locales } from '@/config/locales'
import { Metadata, ResolvingMetadata } from 'next'
import { useTranslations } from 'next-intl'

interface Props {
  id: string
  name: string
  description: string
}

export function generateMetadata(parent: ResolvingMetadata): Metadata {
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
