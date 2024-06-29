import { getCost } from '@/actions/costs/get-cost'
import { getParticipantsByGroupId } from '@/actions/participants/get-participants-by-group-id'
import { FormContainer } from '@/components'
import { CostForm } from '@/components/costForm/CostForm'
import { Routes } from '@/enums/routes'
import { CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    id: string[]
  }
}

const NewCostPage = async ({ params }: Props) => {
  const ids = params.id ?? []
  const groupId = ids[0] ? params.id[0] : ''
  const costId = ids[1] ? params.id[1] : ''

  if (!groupId) {
    redirect(Routes.GROUPS)
  }

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
      redirect(`${Routes.COST_FORM}/${groupId}`)
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
    <FormContainer title={title}>
      <CostForm cost={cost} groupId={groupId} />
    </FormContainer>
  )
}

export default NewCostPage
