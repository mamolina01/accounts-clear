'use server'

import { Routes } from '@/enums/routes'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const removeCost = async (id: string) => {
  try {
    await prisma.costAssignment.deleteMany({
      where: {
        costId: id
      }
    })

    const { groupId } = await prisma.cost.delete({
      where: {
        id: id
      },
      select: {
        groupId: true
      }
    })
    revalidatePath(`${Routes.GROUPS}/${groupId}`)

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
