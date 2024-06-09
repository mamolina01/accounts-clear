'use server'

import prisma from '@/lib/prisma'
import { CostProps } from '@/types/cost'

export const createCost = async (data: CostProps, groupId: string) => {
  try {
    const { id: costId } = await prisma.cost.create({
      data: {
        title: data.title,
        amount: Number(data.amount),
        participantId: data.paidBy.id,
        date: new Date(),
        groupId: groupId
      }
    })

    const participantsData = data.assignedUsers.map(participant => ({
      costId: costId,
      participantId: participant.id
    }))

    await prisma.costAssignment.createMany({
      data: participantsData
    })

    await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        total: {
          increment: Number(data.amount)
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
