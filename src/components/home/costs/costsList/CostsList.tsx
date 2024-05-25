import { CostItem } from "../costItem/CostItem"

interface Props {
  paidBy: {
    name: string
  }
  assignedUsers: {
    id: string
    participant: { name: string } | null
  }[]
  id: string
  title: string
  amount: number
  date: Date
  groupId: string | null
  participantId: string
}

export const CostsList = ({ costs }: { costs: Props[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {costs.map(cost => (
        <CostItem key={cost.id} cost={cost} />
      ))}
    </div>
  )
}
