'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { GroupInfo, ParticipantGroup } from '@/types/group'

export const updateGroup = async (group: GroupInfo, groupId: string) => {
  try {
    const session = await auth()
    if (!session?.user.name || !groupId) {
      return {
        ok: false
      }
    }

    const { modifiedUsers, removedUsers } = await filterParticipants(group.participants, groupId)

    await prisma.group.update({
      where: {
        id: groupId
      },
      data: {
        name: group.name,
        description: group.description,
        category: group.category
      }
    })

    modifiedUsers.map(async (participant: ParticipantGroup) => {
      await prisma.participant.update({
        where: {
          id: participant.id
        },
        data: {
          name: participant.name
        }
      })
    })

    removedUsers.map(async (participant: ParticipantGroup) => {
      await prisma.participant.delete({
        where: {
          id: participant.id
        }
      })
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

interface FilterParticipantProps {
  modifiedUsers: ParticipantGroup[]
  removedUsers: ParticipantGroup[]
}

const filterParticipants = async (
  participants: ParticipantGroup[],
  groupId: string
): Promise<FilterParticipantProps> => {
  const group = await prisma.group.findFirst({
    where: {
      id: groupId
    },
    include: {
      participants: {
        select: {
          id: true,
          name: true,
          assignedCosts: {
            select: {
              id: true,
              costId: true,
              participantId: true
            }
          }
        }
      }
    }
  })

  if (!group || !group.participants) {
    return {
      modifiedUsers: [],
      removedUsers: []
    }
  }

  const { participants: initialParticipants } = group

  const filteredParticipants = participants.reduce(
    (accumulator: ParticipantGroup[], participant1: ParticipantGroup) => {
      const tempParticipant = initialParticipants.find(
        (participant2: ParticipantGroup) =>
          participant1.id === participant2.id && participant1.name !== participant2.name
      )

      if (tempParticipant) {
        accumulator.push(participant1)
      }

      return accumulator
    },
    []
  )

  const combinedArray = participants.concat(initialParticipants)

  const idCount: Record<string, number> = combinedArray.reduce((acc, obj) => {
    acc[obj.id] = (acc[obj.id] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const removedUsers = combinedArray.filter(
    participant => idCount[participant.id] === 1 && participant.assignedCosts.length === 0
  )

  return {
    modifiedUsers: filteredParticipants,
    removedUsers
  }
}
