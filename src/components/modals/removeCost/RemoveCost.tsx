'use client'
import { useModalsStore } from '@/store'
import styles from './RemoveCost.module.scss'
import toast from 'react-hot-toast'
import Image from 'next/image'
import warningIcon from '@/public/warning.svg'
import { Modal } from '../modal/Modal'
import { removeCost } from '@/actions/costs/remove-cost'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export const RemoveCost = () => {
  const { isRemoveCostModalOpen, setIsRemoveCostModalOpen: setIsOpen } = useModalsStore(state => state)
  const { state: isOpen, id } = isRemoveCostModalOpen
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('modals.removeCost')

  const closeModal = () => {
    setIsOpen({ id: '', state: false })
  }

  const onDeleteCost = async () => {
    try {
      setIsLoading(true)
      const { ok } = await removeCost(id)

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
        <button className={`${styles.button} ${styles.confirm}`} onClick={onDeleteCost} disabled={isLoading}>
          {t('yes')}
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={closeModal} disabled={isLoading}>
          {t('no')}
        </button>
      </div>
    </Modal>
  )
}
