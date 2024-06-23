'use client'
import { ReactNode, useRef } from 'react'
import styles from './Modal.module.scss'
import { useOutsideClick } from '@/hooks'
import { IoCloseSharp } from 'react-icons/io5'

interface Props {
  children: ReactNode
  isOpen: boolean
  closeModal: () => void
}

export const Modal = ({ children, isOpen, closeModal }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useOutsideClick(modalRef, closeModal)

  if (!isOpen) {
    return <></>
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container} ref={modalRef}>
        <IoCloseSharp size={25} className={styles.closeIcon} onClick={closeModal} />

        {children}
      </div>
    </div>
  )
}
