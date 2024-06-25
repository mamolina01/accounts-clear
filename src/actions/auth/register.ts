'use server'

import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import { login } from '..'
export const registerUser = async (name: string, email: string, password: string) => {
  try {

    const emailExists = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (emailExists) {
      return {
        ok: false,
        message: 'Email already exists'
      }
    }

    await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password)
      }
    })

    await login(email.toLowerCase(), password)

    return {
      ok: true,
      message: 'Logged!'
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'Something went wrong!'
    }
  }
}
