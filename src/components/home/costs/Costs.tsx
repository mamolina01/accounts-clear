import { Tabs } from './tabs/Tabs'
import { CostsList } from './costsList/CostsList'
import { CostProps } from '@/types/cost'

export const Costs = async ({ costs }: { costs: CostProps[] }) => {
  return (
    <div className="flex flex-col gap-5 bg-primary p-3 rounded">
      <Tabs />
      <CostsList costs={costs} />
    </div>
  )
}
