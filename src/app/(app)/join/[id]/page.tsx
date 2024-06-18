import { getGroupByIdToJoin } from '@/actions'
import { FormContainer, JoinGroup } from '@/components'

interface Props {
  params: {
    id: string
  }
}

const JoinPage = async ({ params }: Props) => {
  const groupId = params.id ? params.id : ''
  const { group } = await getGroupByIdToJoin(groupId)

  return (
    <FormContainer title="Join a new group">
      <JoinGroup group={group} />
    </FormContainer>
  )
}

export default JoinPage
