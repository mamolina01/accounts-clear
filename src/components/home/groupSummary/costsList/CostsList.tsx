import { CostProps } from '@/types/cost'
import { CostItem } from '../costItem/CostItem'

export const CostsList = ({ costs }: { costs: CostProps[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {costs.map(cost => (
        <CostItem key={cost.id} cost={cost} />
      ))}
    </div>
  )
}
