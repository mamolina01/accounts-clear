import { getCost, getParticipantsByGroupId } from '@/actions'
import { CostForm, ContainerForm } from '@/components'
import { CostPropsTemp, ParticipantPropsTemp } from '@/types/cost'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string[]
  }
}

const NewCostPage = async ({ params }: Props) => {
  const groupId = params.id ? params.id[0] : ''
  const costId = params.id ? params.id[1] : ''

  if (costId === '') {
    redirect(`/cost/${groupId}`)
  }

  let cost: CostPropsTemp = {
    id: '',
    title: '',
    amount: '',
    paidBy: {
      id: '',
      name: ''
    },
    assignedUsers: []
  }

  let formattedParticipants: ParticipantPropsTemp[] = []

  if (costId !== '') {
    const temporaryCost = await getCost(costId)

    if (!temporaryCost) {
      redirect(`/cost/${groupId}`)
    }

    const participants = await getParticipantsByGroupId(groupId)

    participants.map((participant: ParticipantPropsTemp) => {
      const tempParticipant = cost?.assignedUsers.find(
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
      assignedUsers: formattedParticipants
    }
  } else {
    const participants = await getParticipantsByGroupId(groupId)

    formattedParticipants = participants.map((participant: ParticipantPropsTemp) => {
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

  return (
    <ContainerForm title="New Cost">
      <CostForm cost={cost} groupId={groupId} />
    </ContainerForm>
  )
}

export default NewCostPage
