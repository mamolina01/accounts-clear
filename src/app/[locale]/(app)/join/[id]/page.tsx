import { getGroupByIdToJoin } from '@/actions/groups/get-group-by-id'
import { UserIsAmongParticipants } from '@/actions/participants/user-is-among-participants'
import { JoinGroup } from '@/components'
import { Routes } from '@/enums/routes'
import { redirect } from '@/lib/i18nNavigation'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const groupId = params.id ?? ''

  const { group } = await getGroupByIdToJoin(groupId)

  return {
    title: group?.name,
    description: `Join to ${group?.name} group.`
  }
}

const JoinPageId = async ({ params }: Props) => {
  const groupId = params.id ?? ''
  const isAmongParticipants = await UserIsAmongParticipants(groupId)
  if (isAmongParticipants) {
    redirect(Routes.GROUPS)
  }

  const { group } = await getGroupByIdToJoin(groupId)

  if (!group) {
    redirect(Routes.HOME)
    return
  }

  return <JoinGroup group={group} />
}

export default JoinPageId
