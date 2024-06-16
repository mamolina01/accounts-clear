'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth.config'

export const getGroupsByUserId = async () => {
  const session = await auth()

  if (!session) return []

  try {
    const participant = await prisma.participant.findFirst({
      where: {
        userId: session.user.id
      }
    })

    if (!participant) return {}

    const group = await prisma.group.findFirst({
      where: {
        participants: {
          some: {
            userId: participant.userId
          }
        },
        id: session.user.id
      },
      include: {
        participants: {
          select: {
            id: true,
            name: true
          }
        },
        costs: {
          select: {
            id: true,
            title: true,
            date: true,
            amount: true,
            paidBy: {
              select: {
                id: true,
                name: true
              }
            },
            assignedUsers: {
              select: {
                participant: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          },
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!group) return {}

    return group
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
