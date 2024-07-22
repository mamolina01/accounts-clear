import { Category } from '@prisma/client'

export interface GroupDetail {
  id: string
  name: string
  description: string
  total: number
  category: Category
  participants: Participant[]
  costs: Cost[]
}
export interface Cost {
  id: string
  title: string
  date: Date
  amount: number
  paidBy: Participant
  assignedUsers: AssignedUser[]
}
interface AssignedUser {
  participant: Participant | null
}
interface Participant {
  id: string
  name: string
}
