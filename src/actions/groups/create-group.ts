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
        category: data.category,
        users: {
          connect: { id: data.id }
        }
      }
    })

    await prisma.user.update({
      where: { id: data.id },
      data: {
        groups: {
          connect: { id: groupId }
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
