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

  const copyID = async () => {
    try {
      await navigator.clipboard.writeText(shareModal.id)
      toast.success('Copied to clipboard')
    } catch (err) {
      toast.error('Error copying')
    }
  }

  return (
    <Modal isOpen={shareModal.state} closeModal={closeModal}>
      <h5 className={styles.title}>Share Group</h5>

      <div className={styles.groupContainer}>
        <label className={styles.groupLink}>Group ID</label>
        <div className={styles.linkContainer}>
          <p className={styles.textLink}>{shareModal.id}</p>
          <button className="flex items-center gap-2 self-center bg-quarteriary p-1 rounded">
            <MdOutlineContentCopy size={20} onClick={copyID} className={styles.copyIcon} />
          </button>
        </div>
      </div>
      <button className="flex items-center gap-2 self-center bg-quarteriary p-1 rounded" onClick={copyLink}>
        Copy link to join
        <MdOutlineContentCopy size={20} className={styles.copyIcon} />
      </button>
      <p className={styles.text}>Anyone with the id can join this group</p>
    </Modal>
  )
}
