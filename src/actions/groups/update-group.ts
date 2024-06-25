'use server'

import { auth } from '@/auth.config'
import { Routes } from '@/enums/routes'
import prisma from '@/lib/prisma'
import { GroupInfo, ParticipantGroup } from '@/types/group'
import { updateGroupFunctions } from '@/utils/updateGroupFunctions'
import { revalidatePath } from 'next/cache'

export const updateGroup = async (group: GroupInfo, groupId: string) => {
  try {
    const session = await auth()
    if (!session?.user.name || !groupId) {
      return {
        ok: false
      }
    }

    const { modifiedUsers, removedUsers, newUsers } = await filterParticipants(group.participants, groupId)

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

    const participantsData = newUsers.map(({ name }) => ({
      name: name,
      groupId: groupId
    }))

    await prisma.participant.createMany({
      data: participantsData
    })

    revalidatePath(`${Routes.GROUPS}`)

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
  newUsers: ParticipantGroup[]
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

  if (!group) {
    return {
      modifiedUsers: [],
      removedUsers: [],
      newUsers: []
    }
  }
  const { participants: initialParticipants } = group

  const { getModifiedParticipants, getRemovedParticipants, getNewParticipants } = updateGroupFunctions(
    initialParticipants,
    participants
  )

  const modifiedUsers = getModifiedParticipants()

  const removedUsers = getRemovedParticipants()

  const newUsers = getNewParticipants()

  return {
    modifiedUsers,
    removedUsers,
    newUsers
  }
}
