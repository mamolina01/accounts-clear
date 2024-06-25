'use client'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

import { GroupDetail } from '@/types/groupDetail'
import Link from 'next/link'
import { Routes } from '@/enums/routes'
import { GroupMenu } from '@/components'

interface Props {
  group: GroupDetail
}

export const TopSection = ({ group }: Props) => {
  return (
    <div className="col-span-2 flex justify-between items-center">
      <Link href={Routes.GROUPS}>
        <IoArrowBack size={20} />
      </Link>
      <h4 className="text-3xl">{group.name}</h4>
      <GroupMenu groupId={group.id} />
    </div>
  )
}
