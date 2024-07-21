'use client'
import { Routes } from '@/enums/routes'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFoundPage = () => {
  const router = useRouter()
  router.push(Routes.HOME)

  return <></>
}

export default NotFoundPage
