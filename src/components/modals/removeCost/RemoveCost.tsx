'use client'
import { useModalsStore } from '@/store'
import styles from './RemoveCost.module.scss'
import { removeCost } from '@/actions'
import toast from 'react-hot-toast'
import Image from 'next/image'
import warningIcon from '@/public/warning.svg'
import { Modal } from '../modal/Modal'

export const RemoveCost = () => {
  const { isRemoveCostModalOpen, setIsRemoveCostModalOpen } = useModalsStore(state => state)
  const { state, id } = isRemoveCostModalOpen

  const closeModal = () => {
    setIsRemoveCostModalOpen({ id: '', state: false })
  }

  const onDeleteCost = async () => {
    const { ok } = await removeCost(id)

    if (ok) {
      toast.success('Successfully removed!')
    } else {
      toast.error('Something went wrong!')
    }
    closeModal()
  }

  return (
    <Modal isOpen={state} closeModal={closeModal}>
      <Image src={warningIcon} alt="warning" className={styles.icon} />
      <h4 className={styles.title}>Do you want to delete this cost?</h4>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.confirm}`} onClick={onDeleteCost}>
          Yes
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={closeModal}>
          No
        </button>
      </div>
    </Modal>
  )
}
