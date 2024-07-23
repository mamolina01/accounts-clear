'use client'
import { Routes } from '@/enums/routes'
import { useOutsideClick } from '@/hooks'
import { Link } from '@/lib/i18nNavigation'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import styles from './GroupMenu.module.scss'
import { IoMdShare } from 'react-icons/io'
import { useModalsStore } from '@/store'
import { useTranslations } from 'next-intl'

export const GroupMenu = ({ groupId }: { groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { setShareModal } = useModalsStore(state => state)
  const { setIsRemoveGroupModalOpen } = useModalsStore(state => state)
  const t = useTranslations('groupMenu')

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
      <BsThreeDotsVertical className={styles.toggleMenuButton} onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className={styles.menuContainer} ref={menuRef}>
          <button className={styles.option} onClick={setModal}>
            <IoMdShare />
            <span>{t('share')}</span>
          </button>
          <Link href={`${Routes.GROUP_FORM}/${groupId}`} className={styles.option}>
            <FaEdit />
            <span>{t('edit')}</span>
          </Link>
          <button className={styles.option} onClick={deleteGroup}>
            <FaTrashAlt />
            <span>{t('delete')}</span>
          </button>
        </div>
      )}
    </div>
  )
}
