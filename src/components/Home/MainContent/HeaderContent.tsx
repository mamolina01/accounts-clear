import { Count } from '@/types/count'
import React from 'react'

export const HeaderContent = () => {
  const count: Count = {
    title: 'Pizzas',
    description: 'Juntada de finde largo',
    total: 1000
  }

  return (
    <div className="flex justify-between p-3 bg-primary rounded-md items-center">
      <div>
        <h4 className="text-2xl">{count.title}</h4>
        <span className="text-tertiary text-sm">{count.description}</span>
      </div>
      <div className="text-end">
        <p className="text-xl">Total Gastado</p>
        <p className="text-lg text-primary">${count.total}</p>
      </div>
    </div>
  )
}
