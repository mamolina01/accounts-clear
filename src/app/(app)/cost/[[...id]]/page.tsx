import { getCost, getParticipantsByGroupId } from '@/actions'
import { CostForm, ContainerForm } from '@/components'
import { CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string[]
  }
}

const NewCostPage = async ({ params }: Props) => {
  const groupId = params.id[0] ? params.id[0] : ''
  const costId = params.id[1] ? params.id[1] : ''

  let cost: CostPropsTemp = {
    id: '',
    title: '',
    amount: '',
    paidBy: '',
    assignedUsers: []
  }

  let formattedParticipants: ParticipantSelectable[] = []

  if (costId !== '') {
    const temporaryCost = await getCost(costId)

    if (!temporaryCost) {
      redirect(`/cost/${groupId}`)
    }

    const participants = await getParticipantsByGroupId(groupId)

    participants.map((participant: Participant) => {
      const tempParticipant = temporaryCost?.assignedUsers.find(
        ({ participant: participant2 }: any) => participant2.id === participant.id
      )
      if (tempParticipant) {
        formattedParticipants.push({ ...participant, selected: true })
      } else {
        formattedParticipants.push({ ...participant, selected: false })
      }
    })

    cost = {
      ...temporaryCost,
      amount: `${temporaryCost.amount}`,
      assignedUsers: formattedParticipants,
      paidBy: temporaryCost.paidBy.id
    }
  } else {
    const participants = await getParticipantsByGroupId(groupId)

    formattedParticipants = participants.map((participant: Participant) => {
      return {
        ...participant,
        selected: true
      }
    })
    cost = {
      ...cost,
      assignedUsers: formattedParticipants
    }
  }

  const title = cost?.id ? 'Edit cost' : 'Add a new cost'

  return (
    <ContainerForm title={title}>
      <CostForm cost={cost} groupId={groupId} />
    </ContainerForm>
  )
}

export default NewCostPage
