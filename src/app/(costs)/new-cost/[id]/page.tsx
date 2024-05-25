import { getParticipantsByGroupId } from '@/actions'
import { CostForm, FormContainer } from '@/components'

interface Props {
  params: {
    id: string
  }
}

interface ParticipantProps {
  name: string
  id: string
}

const NewCostPage = async ({ params }: Props) => {
  const { id } = params
  const participants = await getParticipantsByGroupId(id)
  const newParticipants = participants.map((participant: ParticipantProps) => {
    return {
      ...participant,
      selected: true
    }
  })
  return (
    <FormContainer title="New Cost">
      <CostForm participants={newParticipants} groupId={id} />
    </FormContainer>
  )
}

export default NewCostPage
