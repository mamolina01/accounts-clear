'use server'

import prisma from '@/lib/prisma'

export const getGroupById = async (id: string) => {
  try {
    const group = await prisma.group.findFirst({
      where: {
        id: id
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true,
            assignedCosts: true
          }
        }
      }
    })

    return {
      group
    }
  } catch (error) {
    throw new Error('There was an error getting a group')
  }
}
