import { GroupDetail } from '@/types/groupDetail'
import { CostItem } from '../costItem/CostItem'

interface Props {
  group: GroupDetail
}

export const CostsList = ({ group }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {group.costs.map(cost => (
        <CostItem key={cost.id} cost={cost} groupId={group.id} />
      ))}
    </div>
  )
}
