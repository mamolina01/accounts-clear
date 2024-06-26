'use client'
import { Routes } from '@/enums/routes'
import { useOutsideClick } from '@/hooks'
import { useModalsStore } from '@/store'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

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
    <div className="self-center relative">
      <BsThreeDotsVertical className="text-xl cursor-pointer" onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className="bg-secondary border border-tertiary rounded absolute top-2 right-4 z-10" ref={menuRef}>
          <Link
            href={`${Routes.COST_FORM}/${groupId}/${costId}`}
            className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary"
          >
            <FaEdit />
            <p>Edit</p>
          </Link>
          <button
            className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary border-t border-tertiary"
            onClick={deleteCost}
          >
            <FaTrashAlt />
            <p>Delete</p>
          </button>
        </div>
      )}
    </div>
  )
}
