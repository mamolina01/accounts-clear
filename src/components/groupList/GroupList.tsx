import { getGroupListByUserId } from '@/actions/groups/get-group-list-by-userId'
import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { MdGroups } from 'react-icons/md'
import styles from './GroupList.module.scss'
import Link from 'next/link'
import { Routes } from '@/enums/routes'

interface Props {
  id: string
  name: string
  description: string
}

export const GroupList = async () => {
  const groups: Props[] = await getGroupListByUserId()

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>My Groups</h4>

      {/* TODO: Develop an empty groups */}
      {groups.map(group => (
        <Link href={`${Routes.GROUPS}/${group.id}`} className={styles.group} key={group.id}>
          <div className={styles.listIcon} />
          <div className={styles.textContainer}>
            <p>{group.name}</p>
            <p className={styles.description}>{group.description ?? 'No description'}</p>
          </div>
        </Link>
      ))}

      <Link href={Routes.GROUP_FORM} className={`${styles.option} ${styles.divider}`}>
        <FiPlusCircle size={20} />
        <span>Create a new group</span>
      </Link>

      <div className={styles.option}>
        <MdGroups size={20} />
        <span>Join group</span>
      </div>
    </div>
  )
}
