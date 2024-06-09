'use server'

import prisma from '@/lib/prisma'

interface UserProps {
  participant: {
    id: string
    name: string
  } | null
}

export const getCost = async (id: string) => {
  try {
    const cost = await prisma.cost.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true,
        amount: true,
        paidBy: {
          select: {
            id: true,
            name: true
          }
        },
        assignedUsers: {
          select: {
            participant: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: {
            participant: {
              name: 'asc'
            }
          }
        }
      }
    })

    // if (cost?.assignedUsers && cost?.assignedUsers.length > 0) {
    //   const formattedCost = {
    //     ...cost,
    //     assignedUsers: cost.assignedUsers.map((user: UserProps) => ({
    //       id: user?.participant?.id,
    //       name: user?.participant?.name
    //     }))
    //   }

    //   return formattedCost
    // }

    return cost
  } catch (error) {
    throw new Error('There was an error getting a group')
  }
}
