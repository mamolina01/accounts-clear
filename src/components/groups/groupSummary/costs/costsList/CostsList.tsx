import { CostItem } from '../costItem/CostItem'
import { GroupProps } from '@/types/group'

export const CostsList = ({ group }: { group: GroupProps }) => {
  return (
    <div className="flex flex-col gap-1">
      {group.costs.map(cost => (
        <CostItem key={cost.id} cost={cost} groupId={group.id} />
      ))}
    </div>
  )
}
