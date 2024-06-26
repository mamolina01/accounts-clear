import { GroupDetail } from '@/types/groupDetail'
import { CostItem } from '../costItem/CostItem'
import styles from './CostList.module.scss'

interface Props {
  group: GroupDetail
}

export const CostsList = ({ group }: Props) => {
  return (
    <div className={styles.container}>
      {group.costs.map(cost => (
        <CostItem key={cost.id} cost={cost} groupId={group.id} />
      ))}
    </div>
  )
}
