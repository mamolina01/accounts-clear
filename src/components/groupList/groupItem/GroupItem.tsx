import { Routes } from '@/enums/routes'
import Link from 'next/link'
import styles from '../GroupList.module.scss'
import { GroupMenu } from '@/components'
import { useTranslations } from 'next-intl'

interface Props {
  group: {
    id: string
    name: string
    description: string
  }
}

export const GroupItem = ({ group }: Props) => {
  const t = useTranslations('groupList')
  return (
    <div className={styles.groupContainer}>
      <Link href={`${Routes.GROUPS}/${group.id}`} className={styles.group}>
        <div className={styles.listIcon} />
        <div className={styles.textContainer}>
          <p>{group.name}</p>
          <p className={styles.description}>{group.description !== '' ? t('noDescription') : group.description}</p>
        </div>
      </Link>
      <GroupMenu groupId={group.id} />
    </div>
  )
}
