import { getCostByGroupId } from '@/actions'
import { CostItem } from '.'

export const CostsList = async ({ groupId }: { groupId: string }) => {
  const costs = await getCostByGroupId(groupId)

  return (
    <div className="flex flex-col gap-1 mx-1">
      {costs.map(cost => (
        <CostItem key={cost.id} cost={cost} />
      ))}
    </div>
  )
}
