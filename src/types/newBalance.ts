import { Category } from '@prisma/client'

export interface ParticipantProps {
  name: string
  id: number
}

export interface newBalanceProps {
  title: string
  description: string
  category: Category
  participants: ParticipantProps[]
}
