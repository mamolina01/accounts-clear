'use client'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './ShareGroup.module.scss'
import { useModalsStore } from '@/store'
import toast from 'react-hot-toast'
import { getCurrentUrl } from '@/utils'
import { Modal } from '../modal/Modal'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export const ShareGroup = () => {
  const { shareModal, setShareModal: setIsOpen } = useModalsStore(state => state)
  const { state: isOpen, id } = shareModal
  const [baseUrl, setBaseUrl] = useState<string>('')
  const t = useTranslations('modals.shareGroup')

  useEffect(() => {
    if (id) {
      const url = getCurrentUrl(id)
      setBaseUrl(url)
    }
  }, [id])

  const closeModal = () => {
    setIsOpen({ id: '', state: false })
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl)
      toast.success(t('copied'))
    } catch (err) {
      toast.error(t('errorCopying'))
    }
  }

  const copyID = async () => {
    try {
      await navigator.clipboard.writeText(id)
      toast.success(t('copied'))
    } catch (err) {
      toast.error(t('errorCopying'))
    }
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h4 className={styles.title}>{t('title')}</h4>

      <div className={styles.groupContainer}>
        <span className={styles.label}>{t('groupID')}</span>
        <div className={styles.linkContainer}>
          <p className={styles.textLink}>{id}</p>
          <button className={styles.copyButton}>
            <MdOutlineContentCopy onClick={copyID} className={styles.icon} />
          </button>
        </div>
      </div>
      <button className={styles.copyButton} onClick={copyLink}>
        {t('copyToJoin')}
        <MdOutlineContentCopy className={styles.icon} />
      </button>
      <p className={styles.text}>{t('anyoneCanJoin')}</p>
    </Modal>
  )
}
