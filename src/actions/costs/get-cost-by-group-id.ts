'use server'
import prisma from '@/lib/prisma'

export const getCostByGroupId = async (groupId: string) => {
  try {
    const costs = await prisma.cost.findMany({
      where: {
        groupId: groupId
      },
      include: {
        paidBy: {
          select: {
            name: true
          }
        },
        assignedUsers: {
          select: {
            id: true,
            paid: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return costs
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting costs')
  }
}
