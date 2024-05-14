import React from 'react'
import { CostsList, HeaderContent } from '.'
import { auth } from '@/auth.config'

interface GroupProps {
  id: string
}

export const CostsContainer = async () => {
  const session = await auth()

  const groups = session?.user?.groups

  if (!groups) {
    return <span>No hay grupos</span>
  }

  return (
    <>
      {groups.map((group: GroupProps) => (
        <div key={group.id} className="flex flex-col gap-2">
          <HeaderContent groupId={group.id} />
          <CostsList groupId={group.id} />
        </div>
      ))}
    </>
  )
}
