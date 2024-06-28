'use client'
import { useModalsStore } from '@/store'
import styles from './RemoveGroup.module.scss'
import toast from 'react-hot-toast'
import Image from 'next/image'
import warningIcon from '@/public/warning.svg'
import { Modal } from '../modal/Modal'
import { removeGroup } from '@/actions/groups/remove-group'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'

export const RemoveGroup = () => {
  const { isRemoveGroupModalOpen, setIsRemoveGroupModalOpen: setIsOpen } = useModalsStore(state => state)
  const { state: isOpen, id } = isRemoveGroupModalOpen
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()

  const closeModal = () => {
    setIsOpen({ id: '', state: false })
    if (pathname !== Routes.GROUPS) {
      router.push(Routes.GROUPS)
    }
  }

  const onDeleteGroup = async () => {
    try {
      setIsLoading(true)
      const { ok } = await removeGroup(id)
      if (ok) {
        toast.success('Successfully removed!')
      } else {
        toast.error('Something went wrong!')
      }
      closeModal()
    } catch (error) {
      toast.error('Something went wrong!')
    }
    setIsLoading(false)
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Image src={warningIcon} alt="warning" className={styles.icon} />
      <h4 className={styles.title}>Do you want to delete this group?</h4>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.confirm}`} onClick={onDeleteGroup} disabled={isLoading}>
          Yes
        </button>
        <button className={`${styles.button} ${styles.cancel}`} onClick={closeModal} disabled={isLoading}>
          No
        </button>
      </div>
    </Modal>
  )
}
