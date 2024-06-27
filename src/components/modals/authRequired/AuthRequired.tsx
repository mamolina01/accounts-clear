'use client'
import { useModalsStore } from '@/store'
import styles from './AuthRequired.module.scss'
import Link from 'next/link'
import { Routes } from '@/enums/routes'
import { CiWarning } from 'react-icons/ci'
import { Modal } from '../modal/Modal'

export const AuthRequired = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useModalsStore(state => state)

  const closeModal = () => {
    setIsAuthModalOpen(false)
  }
  return (
    <Modal isOpen={isAuthModalOpen} closeModal={closeModal}>
      <CiWarning className={styles.icon} />
      <h4 className={styles.title}>Authentication required</h4>
      <p className={styles.description}>You must be registered to select a group</p>
      <div className={styles.buttons}>
        <Link href={Routes.LOGIN} className={`${styles.button} ${styles.login}`} onClick={closeModal}>
          Login
        </Link>
        <Link href={Routes.REGISTER} className={`${styles.button} ${styles.register}`} onClick={closeModal}>
          Register
        </Link>
      </div>
    </Modal>
  )
}
