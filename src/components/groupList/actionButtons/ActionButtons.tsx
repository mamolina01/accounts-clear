'use client'
import { Routes } from '@/enums/routes'
import { useModalsStore } from '@/store'
import Link from 'next/link'
import styles from '../GroupList.module.scss'
import { FiPlusCircle } from 'react-icons/fi'
import { MdGroups } from 'react-icons/md'
import { useTranslations } from 'next-intl'

export const ActionButtons = () => {
  const { isJoinGroupModalOpen, setIsJoinGroupModalOpen } = useModalsStore(state => state)
  const t = useTranslations('groupList')

  const toggleJoinGroupModal = () => {
    setIsJoinGroupModalOpen(!isJoinGroupModalOpen)
  }

  return (
    <>
      <Link href={Routes.GROUP_FORM} className={`${styles.option} ${styles.divider}`}>
        <FiPlusCircle size={20} />
        <span>{t('create')}</span>
      </Link>

      <button className={styles.option} onClick={toggleJoinGroupModal}>
        <MdGroups size={20} />
        <span>{t('join')}</span>
      </button>
    </>
  )
}
