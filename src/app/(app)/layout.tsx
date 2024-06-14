import React from 'react'
import { Toaster } from 'react-hot-toast'

const CostsLayout = async ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: 50
          }
        }}
      />
      <div className="flex flex-col w-1/2 mx-auto my-10 gap-5 animate__animated animate__fadeIn">{children}</div>
    </>
  )
}

export default CostsLayout
