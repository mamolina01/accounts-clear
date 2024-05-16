'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { ParticipantProps } from '@/types/newBalance'
import { Category } from '@prisma/client'

interface Props {
  name: string
  description: string
  category: Category
  participants: string[]
}

export const createGroup = async (data: Props) => {
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

    const participantsData = data.participants.map(name => ({
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
