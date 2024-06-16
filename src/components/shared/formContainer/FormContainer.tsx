import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
}

export const FormContainer = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col w-full px-3 py-5 rounded bg-secondary animate__animated animate__fadeIn">
      <h5 className="text-2xl text-center font-semibold">{title}</h5>
      {children}
    </div>
  )
}
