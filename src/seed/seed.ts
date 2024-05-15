import { Category } from '@prisma/client'
import bcryptjs from 'bcryptjs'

export const initialData = {
  users: [
    {
      email: 'matias@mail.com',
      name: 'Matias Molina',
      password: bcryptjs.hashSync('123456')
    },
    {
      email: 'martin@mail.com',
      name: 'Martin Flores',
      password: bcryptjs.hashSync('123456')
    },
    {
      email: 'Maria@mail.com',
      name: 'Maria Lopez',
      password: bcryptjs.hashSync('123456')
    },
    {
      email: 'Pedro@mail.com',
      name: 'Pedro Martinez',
      password: bcryptjs.hashSync('123456')
    },
    {
      email: 'Agustin@mail.com',
      name: 'Agustin Garcia',
      password: bcryptjs.hashSync('123456')
    }
  ],
  groups: [
    {
      name: 'My Birthday',
      description: 'Celebrating my 25 years old',
      category: Category.Celebration
    },
    {
      name: 'My degree',
      description: 'Celebrating my engineering degree',
      category: Category.Celebration
    },
    {
      name: 'New York 2024',
      description: 'Organazing our travel',
      category: Category.Travel
    }
  ]
}
