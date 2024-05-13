'use server'

import prisma from '@/lib/prisma'

export const getGroupById = async () => {
  try {
    // TODO: filter by group id
    const group = await prisma.group.findFirst()

    if (!group) return null

    return {
      ...group
    }
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
