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

    const participants = await filterParticipants(group.participants, groupId)

    // await prisma.group.update({
    //   where: {
    //     id: groupId
    //   },
    //   data: {
    //     name: group.name,
    //     description: group.description,
    //     category: group.category
    //   }
    // })

    // participants.modifiedUsers.map(async (participant: ParticipantGroup) => {
    //   await prisma.participant.update({
    //     where: {
    //       id: participant.id
    //     },
    //     data: {
    //       name: participant.name
    //     }
    //   })
    // })

    // participants.removedUsers.map(async (participant: ParticipantGroup) => {
    //   await prisma.participant.delete({
    //     where: {
    //       id: participant.id
    //     }
    //   })
    // })

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
          assignedCosts: true
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

  const uniqueElements = combinedArray.filter((participant: ParticipantGroup) => {
    return (
      (participants.includes(participant) && !initialParticipants.includes(participant)) ||
      (!participants.includes(participant) && initialParticipants.includes(participant))
    )
  })

  return {
    modifiedUsers: filteredParticipants,
    removedUsers: []
  }
}
