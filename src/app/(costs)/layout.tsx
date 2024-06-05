import { auth } from '@/auth.config'
import { Header } from '@/components'
import { redirect } from 'next/navigation'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const CostsLayout = async ({ children }: { readonly children: React.ReactNode }) => {
  const session = await auth()
  // if (!session?.user) {
  //   redirect('/')
  // }

  return (
    <>
      <Header />
      <div className="flex justify-center h-full mt-5 mb-10">
        <Toaster
          toastOptions={{
            style: {
              marginTop: 50
            }
          }}
        />
        <div className="flex flex-col w-1/2 gap-5 animate__animated animate__fadeIn">{children}</div>
      </div>
    </>
  )
}

export default CostsLayout
