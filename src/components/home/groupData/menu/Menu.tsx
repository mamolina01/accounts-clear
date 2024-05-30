'use client'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import React, { useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const deleteGroup = () => {}

  useOutsideClick(menuRef, closeMenu)
  return (
    <div ref={menuRef}>
      <BsThreeDotsVertical className="text-xl cursor-pointer" onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className="bg-secondary border border-primary rounded absolute top-2 right-4">
          <div className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary">
            <FaEdit />
            <p>Edit</p>
          </div>
          <div
            className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary border-t border-tertiary"
            onClick={deleteGroup}
          >
            <FaTrashAlt />
            <p>Delete</p>
          </div>
        </div>
      )}
    </div>
  )
}
