import { Category } from '@prisma/client'
import { ParticipantProps } from './newBalance'
import { CostProps } from './cost'

export interface GroupProps {
  id: string
  name: string
  description: string
  total: number
  category: Category | string
  participants: {
    id: string
    name: string
  }[]
  costs: CostProps[]
}
