'use server'

import prisma from '@/lib/prisma'

export const getGroupsByUserId = async (userId: string) => {
  try {
    const participant = await prisma.participant.findFirst({
      where: {
        userId: userId
      }
    })

    if (!participant) return []

    const groups = await prisma.group.findMany({
      where: {
        participants: {
          some: {
            userId: participant.userId
          }
        }
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!groups) return []

    return groups
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}

