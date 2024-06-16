'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getGroupListByUserId = async () => {
  const session = await auth()

  if (!session) return []

  try {
    const participant = await prisma.participant.findFirst({
      where: {
        userId: session.user.id
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
      select: {
        name: true,
        description: true,
        id: true
      }
    })

    if (!groups) return []

    return groups
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
