'use server'

import prisma from '@/lib/prisma'

// TODO: Remove if isn't used
export const getGroupById = async (groupId: string) => {
  try {
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

export const getGroupsById = async (userId: string) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        users: {
          some: {
            id: userId
          }
        }
      },
      select: {
        id: true,
        name: true,
        description: true,
        total: true,
        category: true,
        users: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })

    if (!groups) return []

    console.log(groups)
    return groups
  } catch (error) {
    console.log(error)
    throw new Error('There was an error getting a group')
  }
}
