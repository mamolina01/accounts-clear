'use client'
import { Tabs } from './tabs/Tabs'
import { CostsList } from './costs/costsList/CostsList'
import { useState } from 'react'
import { Balances } from './balances/Balance'
import { GroupProps } from '@/types/group'
import { EmptyCosts } from '@/components'

export const GroupSummary = ({ group }: { group: GroupProps }) => {
  const [tabActive, setTabActive] = useState('costs')

  if (group.costs.length === 0) {
    return <EmptyCosts />
  }

  return (
    <div className="flex flex-col gap-4 bg-primary p-3 rounded">
      <Tabs tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === 'costs' ? <CostsList group={group} /> : <Balances group={group} />}
    </div>
  )
}
