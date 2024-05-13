'use server'

import prisma from '@/lib/prisma'

export const getGroupById = async (groupId: string) => {
  try {
    // TODO: filter by group id
    const group = await prisma.group.findFirst({
      where: {
        id: groupId
      }
    })

    if (!group) return null

    return {
      ...group
    }
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
