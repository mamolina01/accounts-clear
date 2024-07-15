import Link from 'next/link'
import { BsPlusLg } from 'react-icons/bs'
import { Routes } from '@/enums/routes'
import { GroupDetail } from '@/types/groupDetail'
import { TopSection } from './topSection/TopSection'
import styles from './GroupInfo.module.scss'
import { Category } from './category/Category'

interface Props {
  group: GroupDetail
}

export const GroupInfo = ({ group }: Props) => {
  const getUsers = () => {
    let users = group.participants.map(participant => participant.name).join(', ')
    return users
  }

  return (
    <div className={styles.container}>
      <TopSection group={group} />
      <div className={styles.leftContainer}>
        <span className={styles.label}>Description</span>
        <span className={styles.description}>{group.description ? group.description : 'No description'}</span>
        <span className={styles.label}>Participants</span>
        <span className={styles.users}>{getUsers()}</span>
      </div>
      <div className={styles.rightContainer}>
        <Category category={group.category} />
        <p className={styles.label}>Total</p>
        <p className={styles.total}>${group.total}</p>
      </div>
      <div className={styles.addButtonContainer}>
        <Link href={`${Routes.COST_FORM}/${group.id}`} className={styles.button}>
          <BsPlusLg className={styles.icon} />
        </Link>
      </div>
    </div>
  )
}
