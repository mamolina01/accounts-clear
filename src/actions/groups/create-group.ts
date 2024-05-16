'use server'

import prisma from '@/lib/prisma'
import { Category } from '@prisma/client'

interface Props {
  name: string
  description: string
  category: Category
  id: string
}

export const createGroup = async (data: Props) => {
  try {
    const { id: groupId } = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category
      }
    })

    await prisma.participant.create({
      data: {
        name: 'Pedro',
        groups: {
          connect: { id: groupId }
        },
        user: {
          connect: { id: data.id }
        }
      }
    })

    return {
      ok: true
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false
    }
  }
}
