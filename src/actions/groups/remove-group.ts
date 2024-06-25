'use server'

import { Routes } from '@/enums/routes'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const removeGroup = async (id: string) => {
  try {
    await prisma.costAssignment.deleteMany({
      where: {
        cost: {
          groupId: id
        }
      }
    })
    await prisma.cost.deleteMany({
      where: {
        groupId: id
      }
    })
    await prisma.participant.deleteMany({
      where: {
        groupId: id
      }
    })

    await prisma.group.delete({
      where: {
        id: id
      }
    })

    revalidatePath(`${Routes.GROUPS}`)

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
