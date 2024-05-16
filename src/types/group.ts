import { Category } from '@prisma/client'
import { ParticipantProps } from './newBalance'

export interface GroupProps {
  id: string
  name: string
  description: string
  category: Category
  total: number
  participants: ParticipantProps[]
}
