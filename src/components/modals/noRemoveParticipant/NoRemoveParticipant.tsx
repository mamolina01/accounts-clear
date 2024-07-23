'use client'
import { useModalsStore } from '@/store'
import styles from './NoRemoveParticipant.module.scss'
import { CiWarning } from 'react-icons/ci'
import { Modal } from '../modal/Modal'
import { useTranslations } from 'next-intl'

export const NoRemoveParticipant = () => {
  const { isNoRemoveParticipantModalOpen: isOpen, setNoRemoveParticipantModalOpen: setIsOpen } = useModalsStore(
    state => state
  )
  const t = useTranslations('modals.noRemove')

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <CiWarning className={styles.icon} />
      <h4 className={styles.title}>{t('title')}</h4>
      <p className={styles.description}>{t('description')}</p>
      <button className={styles.button} onClick={closeModal}>
        ok
      </button>
    </Modal>
  )
}
