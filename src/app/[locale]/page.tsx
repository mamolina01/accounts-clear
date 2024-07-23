import { auth } from '@/auth.config'
import { HeroSection, Information } from '@/components/home'
import React from 'react'

const MainPage = async () => {
  const session = await auth()

  const isAuthenticated = Boolean(session?.user)

  return (
    <>
      <HeroSection isAuthenticated={isAuthenticated} />
      <Information />
    </>
  )
}

export default MainPage
