export interface Participant {
  name: string
  id: string
}

export interface ParticipantSelectable extends Participant {
  selected: boolean
}

export interface CostProps {
  title: string
  date?: Date
  amount: string
  paidBy: {
    id: string
    name: string
  }
  assignedUsers: Participant[]
}

// TODO: Check prop
export interface CostPropsTemp {
  id: string
  title: string
  date?: Date
  amount: string
  paidBy: {
    id: string
    name: string
  }
  assignedUsers: ParticipantSelectable[]
}
