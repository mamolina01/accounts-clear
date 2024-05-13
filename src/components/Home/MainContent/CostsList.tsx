import { getCostByGroupId } from '@/actions'
import { CostItem } from '.'

export const CostsList = async () => {
  const costs = await getCostByGroupId()

  return (
    <div className="flex flex-col gap-1 ">
      {costs.map(cost => (
        <CostItem key={cost.id} cost={cost} />
      ))}
    </div>
  )
}
