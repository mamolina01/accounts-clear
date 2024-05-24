'use server'

import prisma from '@/lib/prisma'

export const getParticipantsByGroupId = async (groupId: string) => {
  try {
    const group = await prisma.group.findFirst({
      where: {
        id: groupId
      },
      select: {
        participants: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!group) return []

    return group.participants
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
