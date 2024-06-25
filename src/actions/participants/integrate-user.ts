'use server'

import { auth } from '@/auth.config'
import { Routes } from '@/enums/routes'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const integrateUser = async (participantId: string, groupId: string) => {
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

    revalidatePath(Routes.GROUPS)

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
