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


    return cost
  } catch (error) {
    throw new Error('There was an error getting a group')
  }
}
