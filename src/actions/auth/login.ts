'use server'

import { signIn } from '@/auth.config'
import prisma from '@/lib/prisma'

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return {
      ok: true,
      message: 'Logged!'
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'Invalid credentials'
    }
  }
}

export const loginWithGoogle = async (id: string, name: string) => {
  try {

    const user = await prisma.user.findFirst({
      where: {
        id: id
      }
    })

    if (!user) {
      await prisma.user.create({
        data: {
          id: id,
          name: name
        }
      })
    }

    return {
      ok: true,
      message: 'Logged!'
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'Invalid credentials'
    }
  }
}
