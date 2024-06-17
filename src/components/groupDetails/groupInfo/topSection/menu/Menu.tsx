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
import styles from './Menu.module.scss'
import { IoMdShare } from 'react-icons/io'

export const Menu = ({ groupId }: { groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const deleteGroup = async () => {
    Swal.fire({
      title: 'Do you want to delete this group?',
      icon: 'warning',
      background: '#151515',
      color: '#ffffff',
      confirmButtonColor: '#0284c7',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async result => {
      if (result.isConfirmed) {
        const { ok } = await removeGroup(groupId)
        if (ok) {
          toast.success('Successfully removed!')
        } else {
          toast.error('There was an error. Contact the administrator.')
        }
      }
    })
  }

  useOutsideClick(menuRef, closeMenu)
  return (
    <>
      <BsThreeDotsVertical size={20} className={styles.toggleMenuButton} onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className={styles.menuContainer} ref={menuRef}>
          <button className={styles.button} onClick={deleteGroup}>
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
    </>
  )
}
