import React from 'react'
import { CostsList, HeaderContent } from '.'
import { auth } from '@/auth.config'
import { getGroupsById } from '@/actions'
import { GroupProps } from '@/types/group'

export const CostsContainer = async () => {
  const session = await auth()

  const groups = await getGroupsById(session?.user.id ?? '')

  if (!groups) {
    return <span>No hay grupos</span>
  }

  return (
    <>
      {groups.map((group: GroupProps) => (
        <div key={group.id} className="flex flex-col gap-2">
          <HeaderContent group={group} />
          <CostsList groupId={group.id} />
        </div>
      ))}
    </>
  )
}
