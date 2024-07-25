import { getCost } from '@/actions/costs/get-cost'
import { getParticipantsByGroupId } from '@/actions/participants/get-participants-by-group-id'
import { CostForm } from '@/components/costForm/CostForm'
import { Routes } from '@/enums/routes'
import { CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { redirect } from '@/lib/i18nNavigation'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string[]
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const ids = params.id ?? []
  const costId = ids[1] ? params.id[1] : ''

  return {
    title: costId ? 'Edit cost' : 'Add a new cost'
  }
}

const NewCostPage = async ({ params }: Props) => {
  const ids = params.id ?? []
  const groupId = ids[0] ? params.id[0] : ''
  const costId = ids[1] ? params.id[1] : ''

  if (!groupId) {
    redirect(Routes.GROUPS)
    return
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
      return
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

  return <CostForm cost={cost} groupId={groupId} />
}

export default NewCostPage
