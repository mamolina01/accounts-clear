'use server'

import { auth } from '@/auth.config'
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

export const getGroupByIdExtended = async (groupId: string) => {
  const session = await auth()

  if (!session) return null

  try {
    const participant = await prisma.participant.findFirst({
      where: {
        userId: session.user.id
      }
    })

    if (!participant) return null

    const group = await prisma.group.findFirst({
      where: {
        participants: {
          some: {
            userId: participant.userId
          }
        },
        id: groupId
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
          }
        }
      }
    })

    if (!group) return null

    return group
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
