'use client'
import { Tabs } from './tabs/Tabs'
import { CostsList } from './costsList/CostsList'
import { useState } from 'react'
import { Balance } from './balance/Balance'
import { GroupProps } from '@/types/group'

export const GroupSummary = ({ group }: { group: GroupProps }) => {
  const [tabActive, setTabActive] = useState('costs')

  return (
    <div className="flex flex-col gap-5 bg-primary p-3 rounded">
      <Tabs tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === 'costs' ? <CostsList costs={group.costs} /> : <Balance group={group} />}
    </div>
  )
}
