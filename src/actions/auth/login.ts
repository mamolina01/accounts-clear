'use server'

import { signIn } from '@/auth.config'
import prisma from '@/lib/prisma'
import { User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import { signOut } from 'next-auth/react'

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

export const loginWithGoogle = async (user: User | AdapterUser) => {

  const { email, name, id, image } = user

  if (!name || !id || !email) {
    await signOut()
    return {
      ok: false,
      message: 'Invalid credentials'
    }
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        provider: 'Google'
      }
    });

    if (!user) {
      await prisma.user.create({
        data: {
          id: id,
          name: name,
          email: email,
          image: image ?? '',
          provider: 'Google'
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


export const getUserId = async (email: string) => {
  try {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
        provider: 'Google'
      },
      select: {
        id: true
      }
    });

    if (!data || !data.id) {
      return {
        ok: false,
        message: 'Invalid credentials'
      }
    }

    return {
      ok: true,
      id: data.id,
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