'use server'

import prisma from '@/lib/prisma'

export const removeCost = async (id: string) => {
  try {
    await prisma.costAssignment.deleteMany({
      where: {
        costId: id
      }
    })

    await prisma.cost.delete({
      where: {
        id: id
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
