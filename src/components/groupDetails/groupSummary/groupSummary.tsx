'use client'
import { Tabs } from './tabs/Tabs'
import { CostsList } from './costs/costsList/CostsList'
import { useState } from 'react'
import { Balances } from './balances/Balance'
import { EmptyCosts } from './costs/emptyCosts/EmptyCosts'
import { GroupDetail } from '@/types/groupDetail'

interface Props {
  group: GroupDetail
}

export const GroupSummary = ({ group }: Props) => {
  const [tabActive, setTabActive] = useState('costs')

  if (group.costs.length === 0) {
    return <EmptyCosts groupId={group.id} />
  }

  return (
    <div className="flex flex-col gap-4 bg-primary p-3 rounded">
      <Tabs tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === 'costs' ? <CostsList group={group} /> : <Balances group={group} />}
    </div>
  )
}
