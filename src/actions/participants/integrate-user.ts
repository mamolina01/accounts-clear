'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const integrateUser = async (participantId: string) => {
  const session = await auth()

  if (!session) {
    return {
      ok: false
    }
  }

  try {
    await prisma.participant.update({
      where: {
        id: participantId
      },
      data: {
        userId: session.user.id
      }
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
