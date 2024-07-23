'use client'
import { useModalsStore } from '@/store'
import styles from './RemoveGroup.module.scss'
import toast from 'react-hot-toast'
import Image from 'next/image'
import warningIcon from '@/public/warning.svg'
import { Modal } from '../modal/Modal'
import { removeGroup } from '@/actions/groups/remove-group'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'
import { useTranslations } from 'next-intl'

export const RemoveGroup = () => {
  const { isRemoveGroupModalOpen, setIsRemoveGroupModalOpen: setIsOpen } = useModalsStore(state => state)
  const { state: isOpen, id } = isRemoveGroupModalOpen
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('modals.removeGroup')

  const closeModal = () => {
    setIsOpen({ id: '', state: false })
    if (pathname !== Routes.GROUPS) {
      router.push(Routes.GROUPS)
    }
  }

  const onDeleteGroup = async () => {
    try {
      setIsLoading(true)
      const { ok } = await removeGroup(id)
      if (ok) {
        toast.success(t('successfullyDeleted'))
      } else {
        toast.error(t('somethingWrong'))
      }
      closeModal()
    } catch (error) {
      toast.error(t('somethingWrong'))
    }
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Image src={warningIcon} alt="warning" className={styles.icon} />
      <h4 className={styles.title}>{t('title')}</h4>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.confirm}`} onClick={onDeleteGroup} disabled={isLoading}>
          {t('yes')}
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={closeModal} disabled={isLoading}>
          {t('no')}
        </button>
      </div>
    </Modal>
  )
}
