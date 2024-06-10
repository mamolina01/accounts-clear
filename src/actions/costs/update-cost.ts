'use server'

import prisma from '@/lib/prisma'
import { CostProps } from '@/types/cost'

export const updateCost = async (cost: CostProps, costId: string) => {
  try {
    await prisma.cost.update({
      where: {
        id: costId
      },
      data: {
        title: cost.title,
        amount: Number(cost.amount),
        participantId: cost.paidBy
      }
    })

    await prisma.costAssignment.deleteMany({
      where: {
        costId: costId
      }
    })

    const participantsData = cost.assignedUsers.map(participant => ({
      costId: costId,
      participantId: participant.id
    }))

    await prisma.costAssignment.createMany({
      data: participantsData
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
