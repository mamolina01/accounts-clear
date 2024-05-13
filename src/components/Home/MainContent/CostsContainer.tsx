import React from 'react'
import { CostsList, HeaderContent } from '.'
import { auth } from '@/auth.config'

export const CostsContainer = async () => {
  const session = await auth()

  // TODO: CHECK USER TYPE
  const groups = session?.user?.groups
  return (
    <>
      {groups.map((group: any) => (
        <div key={group.id} className="flex flex-col gap-2">
          <HeaderContent groupId={group.id} />
          <CostsList groupId={group.id} />
        </div>
      ))}
    </>
  )
}
