'use client'
import { MdOutlineContentCopy } from 'react-icons/md'
import styles from './ShareGroup.module.scss'
import { useModalsStore } from '@/store'
import toast from 'react-hot-toast'
import { Modal } from '@/components'
import { getCurrentUrl } from '@/utils'

export const ShareGroup = () => {
  const { shareModal, setShareModal } = useModalsStore(state => state)

  // TODO: check baseUrl
  const baseUrl = getCurrentUrl(shareModal.id)
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

  return (
    <Modal isOpen={shareModal.state} closeModal={closeModal}>
      <h5 className={styles.title}>Share Group</h5>

      <div className={styles.groupContainer}>
        <p className={styles.groupLink}>Group Link</p>
        <div className={styles.linkContainer}>
          <p className={styles.textLink}>{url}</p>
          <MdOutlineContentCopy size={20} onClick={copyLink} className={styles.copyIcon} />
        </div>
      </div>
      <p className={styles.text}>Anyone with the link can join this group</p>
    </Modal>
  )
}
