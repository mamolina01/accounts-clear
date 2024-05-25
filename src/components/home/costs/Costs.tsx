import { getCostByGroupId } from '@/actions'
import { Tabs } from './tabs/Tabs'
import { CostsList } from './costsList/CostsList'

export const Costs = async ({ groupId }: { groupId: string }) => {
  const costs = await getCostByGroupId(groupId)
  return (
    <div className="flex flex-col gap-5 bg-primary p-3 rounded">
      <Tabs />
      <CostsList costs={costs} />
    </div>
  )
}
