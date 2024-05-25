import React from 'react'

interface Props {
  title: string
  children: React.ReactNode
}

export const ContainerForm = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col w-full px-3 py-5 rounded-md bg-secondary">
      <h5 className="text-2xl text-center font-semibold">{title}</h5>
      {children}
    </div>
  )
}
