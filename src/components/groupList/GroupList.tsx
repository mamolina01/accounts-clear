import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { MdGroups } from 'react-icons/md'
import styles from './GroupList.module.scss'
import Link from 'next/link'
import { Routes } from '@/enums/routes'
import { GroupItem } from './groupItem/GroupItem'
import { FormContainer } from '..'
import { EmptyGroups } from './emptyGroups/EmptyGroups'
import { useTranslations } from 'next-intl'

interface Props {
  id: string
  name: string
  description: string
}
export const GroupList = ({ groups }: { groups: Props[] }) => {
  const t = useTranslations('groupList')
  return (
    <FormContainer title={t('title')}>
      {groups.length === 0 ? <EmptyGroups /> : groups.map(group => <GroupItem group={group} key={group.id} />)}

      <Link href={Routes.GROUP_FORM} className={`${styles.option} ${styles.divider}`}>
        <FiPlusCircle size={20} />
        <span>{t('create')}</span>
      </Link>

      <Link href={Routes.JOIN} className={styles.option}>
        <MdGroups size={20} />
        <span>{t('join')}</span>
      </Link>
    </FormContainer>
  )
}
