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
      <BsThreeDotsVertical className="text-xl cursor-pointer absolute right-0" onClick={() => setShowMenu(true)} />
      {showMenu && (
        <div className="bg-secondary border border-tertiary rounded absolute top-2 right-4" ref={menuRef}>
          <Link
            href={`${Routes.GROUP_FORM}/${groupId}`}
            className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary"
          >
            <FaEdit />
            <p>Edit</p>
          </Link>
          <button
            className="flex px-4 py-1 items-center gap-3 cursor-pointer hover:text-primary border-t border-tertiary"
            onClick={deleteGroup}
          >
            <FaTrashAlt />
            <p>Delete</p>
          </button>
        </div>
      )}
    </>
  )
}
