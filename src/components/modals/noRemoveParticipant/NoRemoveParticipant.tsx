'use client'
import { Modal } from '@/components'
import { useModalsStore } from '@/store'
import styles from './NoRemoveParticipant.module.scss'

export const NoRemoveParticipant = () => {
  const { isNoRemoveParticipantModalOpen: isOpen, setNoRemoveParticipantModalOpen: setIsOpen } = useModalsStore(
    state => state
  )

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h4 className={styles.title}>Couldn't be removed</h4>
      <p className={styles.description}>
        This user couldn't be able to be removed, because he has costs assigned to him.
      </p>
      <button className={styles.button} onClick={closeModal}>
        ok
      </button>
    </Modal>
  )
}
