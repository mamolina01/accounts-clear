'use client'
import { Routes } from '@/enums/routes'
import { useOutsideClick } from '@/hooks'
import { useModalsStore } from '@/store'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import styles from './Menu.module.scss'

export const Menu = ({ costId, groupId }: { costId: string; groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { setIsRemoveCostModalOpen } = useModalsStore(state => state)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const deleteCost = async () => {
    setIsRemoveCostModalOpen({ id: costId, state: true })
  }

  useOutsideClick(menuRef, closeMenu)
  return (
    <div className={styles.container}>
      <BsThreeDotsVertical className={styles.icon} onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className={styles.menu} ref={menuRef}>
          <Link href={`${Routes.COST_FORM}/${groupId}/${costId}`} className={`${styles.option}`}>
            <FaEdit />
            <p>Edit</p>
          </Link>
          <button className={`${styles.option} ${styles.divider}`} onClick={deleteCost}>
            <FaTrashAlt />
            <p>Delete</p>
          </button>
        </div>
      )}
    </div>
  )
}
