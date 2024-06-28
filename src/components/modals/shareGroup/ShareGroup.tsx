'use client'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './ShareGroup.module.scss'
import { useModalsStore } from '@/store'
import toast from 'react-hot-toast'
import { getCurrentUrl } from '@/utils'
import { Modal } from '../modal/Modal'
import { useEffect, useState } from 'react'

export const ShareGroup = () => {
  const { shareModal, setShareModal: setIsOpen } = useModalsStore(state => state)
  const { state: isOpen, id } = shareModal
  const [baseUrl, setBaseUrl] = useState<string>('')

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
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Error copying')
    }
  }

  const copyID = async () => {
    try {
      await navigator.clipboard.writeText(id)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Error copying')
    }
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <h5 className={styles.title}>Share Group</h5>

      <div className={styles.groupContainer}>
        <span className={styles.label}>Group ID</span>
        <div className={styles.linkContainer}>
          <p className={styles.textLink}>{id}</p>
          <button className={styles.copyButton}>
            <MdOutlineContentCopy onClick={copyID} className={styles.icon} />
          </button>
        </div>
      </div>
      <button className={styles.copyButton} onClick={copyLink}>
        Copy link to join
        <MdOutlineContentCopy className={styles.icon} />
      </button>
      <p className={styles.text}>Anyone with the id can join this group</p>
    </Modal>
  )
}
