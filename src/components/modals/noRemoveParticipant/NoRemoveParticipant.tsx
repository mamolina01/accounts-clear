'use client'
import { useModalsStore } from '@/store'
import styles from './NoRemoveParticipant.module.scss'
import { CiWarning } from 'react-icons/ci'
import { Modal } from '../modal/Modal'

export const NoRemoveParticipant = () => {
  const { isNoRemoveParticipantModalOpen: isOpen, setNoRemoveParticipantModalOpen: setIsOpen } = useModalsStore(
    state => state
  )

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <CiWarning className={styles.icon} />
      <h4 className={styles.title}>Couldn{"'"}t be removed</h4>
      <p className={styles.description}>
        This user couldn{"'"}t be able to be removed, because he has costs assigned to him.
      </p>
      <button className={styles.button} onClick={closeModal}>
        ok
      </button>
    </Modal>
  )
}
