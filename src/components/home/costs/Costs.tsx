'use client'
import { Tabs } from './tabs/Tabs'
import { CostsList } from './costsList/CostsList'
import { CostProps } from '@/types/cost'
import { useState } from 'react'

export const Costs = ({ costs }: { costs: CostProps[] }) => {
  const [tabActive, setTabActive] = useState('costs')

  return (
    <div className="flex flex-col gap-5 bg-primary p-3 rounded">
      <Tabs tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === 'costs' ? <CostsList costs={costs} /> : <p>balance</p>}
    </div>
  )
}
