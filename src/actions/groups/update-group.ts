'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { GroupInfo } from '@/types/group'

export const updateGroup = async (group: GroupInfo, groupId: string) => {
  try {
    const session = await auth()
    if (!session?.user.name || !groupId) {
      return {
        ok: false
      }
    }

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

    // await prisma.participant.deleteMany({
    //   where: {
    //     groupId: groupId
    //   }
    // })

    // await prisma.participant.create({
    //   data: {
    //     name: session?.user?.name,
    //     groups: {
    //       connect: { id: groupId }
    //     },
    //     user: {
    //       connect: { id: session?.user.id }
    //     }
    //   }
    // })

    // const participantsData = group.participants.map(name => ({
    //   name: name,
    //   groupId: groupId
    // }))

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
