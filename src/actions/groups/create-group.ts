'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { GroupInfo } from '@/types/group'

export const createGroup = async (data: GroupInfo) => {
  try {
    const session = await auth()
    if (!session?.user.name) {
      return {
        ok: false
      }
    }

    const { id: groupId } = await prisma.group.create({
      data: {
        name: data.name,
        description: data.description,
        category: data.category
      }
    })

    await prisma.participant.create({
      data: {
        name: session?.user?.name,
        groups: {
          connect: { id: groupId }
        },
        user: {
          connect: { id: session?.user.id }
        }
      }
    })

    const tempParticipants = data.participants.filter(participant => participant.id !== session?.user.id)

    const participantsData = tempParticipants.map(({ name }) => ({
      name: name,
      groupId: groupId
    }))

    await prisma.participant.createMany({
      data: participantsData
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
