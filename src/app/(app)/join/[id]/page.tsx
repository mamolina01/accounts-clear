import { UserIsAmongParticipants, getGroupByIdToJoin } from '@/actions'
import { FormContainer, JoinGroup } from '@/components'
import { Routes } from '@/enums/routes'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

const JoinPage = async ({ params }: Props) => {
  const groupId = params.id ? params.id : ''
  const isAmongParticipants = await UserIsAmongParticipants(groupId)
  if (isAmongParticipants) {
    redirect(Routes.GROUPS)
  }

  const { group } = await getGroupByIdToJoin(groupId)

  if (!group) {
    redirect(Routes.GROUPS)
  }

  return (
    <FormContainer title="Join a new group">
      <JoinGroup group={group} />
    </FormContainer>
  )
}

export default JoinPage
