'use client'
import { removeGroup } from '@/actions'
import { useOutsideClick } from '@/hooks'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'

export const Menu = ({ costId, groupId }: { costId: string; groupId: string }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setShowMenu(false)
  }

  const deleteCost = async () => {
    Swal.fire({
      title: 'Do you want to delete this cost?',
      icon: 'warning',
      background: '#151515',
      color: '#ffffff',
      confirmButtonColor: '#0284c7',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(async result => {
      if (result.isConfirmed) {
        // const { ok } = await removeGroup(costId)
        // if (ok) {
        // }
        toast.success('Successfully removed!')
      }
    })
  }

  useOutsideClick(menuRef, closeMenu)
  return (
    <div className="self-center relative">
      <BsThreeDotsVertical className="text-xl cursor-pointer" onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className="bg-secondary border border-tertiary rounded absolute top-2 right-4 z-10" ref={menuRef}>
          <Link
            href={`/cost/${groupId}/${costId}`}
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
