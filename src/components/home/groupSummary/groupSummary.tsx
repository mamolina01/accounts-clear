'use client'
import { Tabs } from './costs/tabs/Tabs'
import { CostsList } from './costs/costsList/CostsList'
import { useState } from 'react'
import { Balances } from './balances/Balance'
import { GroupProps } from '@/types/group'

export const GroupSummary = ({ group }: { group: GroupProps }) => {
  const [tabActive, setTabActive] = useState('costs')

  return (
    <div className="flex flex-col gap-2 bg-primary p-3 rounded">
      <Tabs tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === 'costs' ? <CostsList costs={group.costs} /> : <Balances group={group} />}
    </div>
  )
}
