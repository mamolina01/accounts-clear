'use client'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './ShareGroup.module.scss'
import { useModalsStore } from '@/store'
import { Routes } from '@/enums/routes'
import { useRef } from 'react'
import { useOutsideClick } from '@/hooks'
import { IoCloseSharp } from 'react-icons/io5'
import toast from 'react-hot-toast'

export const ShareGroup = () => {
  const { shareModal, setShareModal } = useModalsStore(state => state)
  const modalRef = useRef<HTMLDivElement>(null)

  const baseUrl = `http://localhost:3000${Routes.JOIN}/${shareModal.id}`
  const url = `${baseUrl.substring(0, 45)}...`

  const closeModal = () => {
    setShareModal({ id: '', state: false })
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Error copying')
    }
  }

  useOutsideClick(modalRef, closeModal)

  if (shareModal.state) {
    return (
      <div className={styles.overlay}>
        <div className={styles.container} ref={modalRef}>
          <IoCloseSharp size={25} className={styles.closeIcon} onClick={closeModal} />
          <h5 className={styles.title}>Share Group</h5>

          <div className={styles.groupContainer}>
            <p className={styles.groupLink}>Group Link</p>
            <div className={styles.linkContainer}>
              <p className={styles.textLink}>{url}</p>
              <MdOutlineContentCopy size={20} onClick={copyLink} className={styles.copyIcon} />
            </div>
          </div>
          <p className={styles.text}>Anyone with the link can join this group</p>
        </div>
      </div>
    )
  }
}
