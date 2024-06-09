import { getParticipantsByGroupId } from '@/actions'
import { CostForm, ContainerForm } from '@/components'

interface Props {
  params: {
    groupId: string[]
    costId?: string[]
  }
}

interface ParticipantProps {
  name: string
  id: string
}

const NewCostPage = async ({ params }: Props) => {
  const groupId = params.groupId ? params.groupId[0] : ''
  // const costId = params.costId ? params.costId[0] : ''

  const participants = await getParticipantsByGroupId(groupId)
  const newParticipants = participants.map((participant: ParticipantProps) => {
    return {
      ...participant,
      selected: true
    }
  })
  return (
    <ContainerForm title="New Cost">
      <CostForm participants={newParticipants} groupId={groupId} />
    </ContainerForm>
  )
}

export default NewCostPage
