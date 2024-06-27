import { getGroupByIdToJoin } from '@/actions/groups/get-group-by-id'
import { UserIsAmongParticipants } from '@/actions/participants/user-is-among-participants'
import { FormContainer, JoinGroup } from '@/components'
import { Routes } from '@/enums/routes'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
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
    redirect(Routes.JOIN)
  }

  return (
    <FormContainer title={`Join to ${group.name}`}>
      <JoinGroup group={group} />
    </FormContainer>
  )
}

export default JoinPageId
