'use client'
import { removeGroup } from '@/actions'
import { Routes } from '@/enums/routes'
import { useOutsideClick } from '@/hooks'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import styles from './GroupMenu.module.scss'
import { IoMdShare } from 'react-icons/io'
import { useModalsStore } from '@/store'

export const GroupMenu = ({ groupId }: { groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { setShareModal } = useModalsStore(state => state)
  const { setIsRemoveGroupModalOpen } = useModalsStore(state => state)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const deleteGroup = async () => {
    setIsRemoveGroupModalOpen({ id: groupId, state: true })
  }

  const setModal = () => {
    closeMenu()
    setShareModal({
      state: true,
      id: groupId
    })
  }

  useOutsideClick(menuRef, closeMenu)
  return (
    <div className={styles.container}>
      <BsThreeDotsVertical size={20} className={styles.toggleMenuButton} onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className={styles.menuContainer} ref={menuRef}>
          <button className={styles.button} onClick={setModal}>
            <IoMdShare />
            <span>Share</span>
          </button>
          <Link href={`${Routes.GROUP_FORM}/${groupId}`} className={styles.button}>
            <FaEdit />
            <span>Edit</span>
          </Link>
          <button className={styles.button} onClick={deleteGroup}>
            <FaTrashAlt />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  )
}
