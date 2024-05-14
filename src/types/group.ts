import { Category } from '@prisma/client'

export interface GroupProps {
  id: string
  name: string
  description: string
  category: Category
  total: number
}
