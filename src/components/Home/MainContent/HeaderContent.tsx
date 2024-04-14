import { CountProps } from '@/types/count'
import React from 'react'

export const HeaderContent = ({ count }: { count: CountProps }) => {
  return (
    <div className="flex justify-between p-3 bg-primary rounded-md items-center">
      <div>
        <h4 className="text-3xl">{count.title}</h4>
        <span className="text-tertiary text-sm">{count.description}</span>
      </div>
      <div className="text-end">
        <p className="text-xl">Total Gastado</p>
        <p className="text-2xl text-primary">${count.total}</p>
      </div>
    </div>
  )
}
