import { auth } from '@/auth.config'
import { Header } from '@/components'
import { redirect } from 'next/navigation'
import React from 'react'

const CostsLayout = async ({ children }: { readonly children: React.ReactNode }) => {
  const session = await auth()
  // if (!session?.user) {
  //   redirect('/')
  // }

  return (
    <>
      <Header />
      <div className="flex justify-center h-full mt-5 mb-10">
        <div className="flex flex-col w-1/2 gap-5">{children}</div>
      </div>
    </>
  )
}

export default CostsLayout
