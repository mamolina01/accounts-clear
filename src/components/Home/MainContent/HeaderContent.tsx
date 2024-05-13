import { getGroupById } from '@/actions'
import { auth } from '@/auth.config'
import { CountProps } from '@/types/count'
import React from 'react'

export const HeaderContent = async ({ groupId }: { groupId: string }) => {
  const group = await getGroupById(groupId)

  if (!group) return <></>

  return (
    <div className="flex justify-between p-3 bg-primary rounded-md items-center">
      <div className="flex flex-col">
        <h4 className="text-3xl">{group.name}</h4>
        <span className="text-tertiary text-sm">{group.description}</span>
        {/* TODO: Add emoji for each category */}
        <span className="text-tertiary text-sm capitalize">{group.category}</span>
      </div>
      <div className="text-end">
        <p className="text-xl">Total Gastado</p>
        <p className="text-2xl text-primary">${group.total}</p>
      </div>
    </div>
  )
}
