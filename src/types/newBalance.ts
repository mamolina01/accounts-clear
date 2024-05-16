import { Category } from '@prisma/client'

export interface ParticipantProps {
  name: string
  id: string
}

export interface newBalanceProps {
  title: string
  description: string
  category: Category
  participants: ParticipantProps[]
}
