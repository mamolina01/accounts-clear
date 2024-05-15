import { initialData } from './seed'
import prisma from '../lib/prisma'

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
  for (const user of initialData.users) {
    try {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          groups: {
            connect: { id: groupId }
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const users = await prisma.user.findMany()

  // * CREATE COSTS
  const { id: costId, amount } = await prisma.cost.create({
    data: {
      title: 'food',
      amount: 100,
      userId: users[0].id,
      date: new Date(),
      groupId: groupId
    }
  })

  users.forEach(async user => {
    // * CREATE RELATIONSHIP BETWEEN USER AND COST
    await prisma.costAssignment.create({
      data: {
        user: { connect: { id: user.id } },
        cost: { connect: { id: costId } }
      }
    })
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
  // const prismaGroup = await prisma.group.findFirst({
  //   include: {
  //     users: true,
  //     costs: true
  //   }
  // })
  // console.log(prismaGroup)

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
