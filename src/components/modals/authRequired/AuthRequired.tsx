'use client'
import { useModalsStore } from '@/store'
import styles from './AuthRequired.module.scss'
import { Link } from '@/lib/i18nNavigation'
import { Routes } from '@/enums/routes'
import { CiWarning } from 'react-icons/ci'
import { Modal } from '../modal/Modal'
import { useTranslations } from 'next-intl'

export const AuthRequired = () => {
  const { isAuthModalOpen: isOpen, setIsAuthModalOpen: setIsOpen } = useModalsStore(state => state)
  const t = useTranslations('modals.authRequired')

  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <CiWarning className={styles.icon} />
      <h4 className={styles.title}>{t('title')}</h4>
      <p className={styles.description}>{t('description')}</p>
      <div className={styles.buttons}>
        <Link href={Routes.LOGIN} className={`${styles.button} ${styles.login}`} onClick={closeModal}>
          {t('login')}
        </Link>
        <Link href={Routes.REGISTER} className={`${styles.button} ${styles.register}`} onClick={closeModal}>
          {t('register')}
        </Link>
      </div>
    </Modal>
  )
}
