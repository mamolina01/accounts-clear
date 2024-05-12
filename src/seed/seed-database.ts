import { initialData } from './seed'
import prisma from '../lib/prisma'
import { Category } from '@prisma/client'

const main = async () => {
  // DELETE TABLES
  await prisma.costAssignment.deleteMany()
  await prisma.cost.deleteMany()
  await prisma.user.deleteMany()
  await prisma.group.deleteMany()

  addData()
}

const addData = async () => {
  // * CREATE GROUPS
  const { id: groupId } = await prisma.group.create({
    data: {
      name: initialData.groups[0].name,
      description: initialData.groups[0].description,
      category: initialData.groups[0].category
    }
  })

  // * CREATE USERS
  const { id: userId } = await prisma.user.create({
    data: {
      name: initialData.users[0].name,
      email: initialData.users[0].email,
      password: initialData.users[0].password,
      groups: {
        connect: { id: groupId }
      }
    }
  })

  // * CREATE COSTS
  const { id: costId, amount } = await prisma.cost.create({
    data: {
      title: 'food',
      amount: 100,
      date: new Date(),
      groupId: groupId
    }
  })

  // * CREATE RELATIONSHIP BETWEEN USER AND COST
  await prisma.costAssignment.create({
    data: {
      userId: userId,
      costId: costId
    }
  })

  await prisma.group.update({
    where: {
      id: groupId
    },
    data: {
      total: amount
    }
  })

  // * GET GROUPS
  const prismaGroup = await prisma.group.findFirst({
    include: {
      users: true,
      costs: true
    }
  })
  console.log(prismaGroup)

  // * GET COSTS
  // const prismaCosts = await prisma.cost.findMany()
  // console.log(prismaCosts)

  // * GET COSTASSIGNMENT
  // const prismaCostsAssignments = await prisma.costAssignment.findMany()
  // console.log(prismaCostsAssignments)
}

;(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
})()
