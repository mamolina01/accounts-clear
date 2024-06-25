import { Routes } from '@/enums/routes'
import Link from 'next/link'
import styles from '../GroupList.module.scss'
import { GroupMenu } from '@/components'

interface Props {
  group: {
    id: string
    name: string
    description: string
  }
}

export const GroupItem = ({ group }: Props) => {
  return (
    <div className={styles.groupContainer}>
      <Link href={`${Routes.GROUPS}/${group.id}`} className={styles.group}>
        <div className={styles.listIcon} />
        <div className={styles.textContainer}>
          <p>{group.name}</p>
          <p className={styles.description}>{group.description ?? 'No description'}</p>
        </div>
      </Link>
      <GroupMenu groupId={group.id} />
    </div>
  )
}
