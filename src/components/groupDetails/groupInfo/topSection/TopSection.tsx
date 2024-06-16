'use client'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Menu } from './menu/Menu'
import { GroupDetail } from '@/types/groupDetail'
import Link from 'next/link'
import { Routes } from '@/enums/routes'

interface Props {
  group: GroupDetail
}

export const TopSection = ({ group }: Props) => {
  return (
    <div className="col-span-2 flex justify-between items-center relative">
      <Link href={Routes.GROUPS}>
        <IoArrowBack size={20} />
      </Link>
      <h4 className="text-3xl">{group.name}</h4>
      <Menu groupId={group.id} />
    </div>
  )
}
