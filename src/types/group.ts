import { CostProps } from './cost'

export interface ParticipantGroup {
  id: string
  name: string
  assignedCosts: {
    id: string
    costId: string
    participantId: string
  }[]
}

export interface GroupInfo {
  id?: string
  name: string
  description: string
  category: string | any
  participants: ParticipantGroup[]
}

//TODO: Unify props
export interface CreateGroupInfo {
  id?: string
  name: string
  description: string
  category: string | any
  participants: string[]
}

export interface GroupProps extends GroupInfo {
  costs: CostProps[]
  id: string
  total: number
}
