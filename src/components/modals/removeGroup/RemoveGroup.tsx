'use client'
import { useModalsStore } from '@/store'
import styles from './RemoveGroup.module.scss'
import { removeGroup } from '@/actions'
import toast from 'react-hot-toast'
import Image from 'next/image'
import warningIcon from '@/public/warning.svg'
import { Modal } from '../modal/Modal'

export const RemoveGroup = () => {
  const { isRemoveGroupModalOpen, setIsRemoveGroupModalOpen } = useModalsStore(state => state)

  const closeModal = () => {
    setIsRemoveGroupModalOpen({ id: '', state: false })
  }

  const onDeleteGroup = async () => {
    const { ok } = await removeGroup(isRemoveGroupModalOpen.id)
    if (ok) {
      toast.success('Successfully removed!')
    } else {
      toast.error('Something went wrong!')
    }
    closeModal()
  }

  return (
    <Modal isOpen={isRemoveGroupModalOpen.state} closeModal={closeModal}>
      <Image src={warningIcon} alt="warning" className={styles.icon} />
      <h4 className={styles.title}>Do you want to delete this group?</h4>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.confirm}`} onClick={onDeleteGroup}>
          Yes
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  )
}
