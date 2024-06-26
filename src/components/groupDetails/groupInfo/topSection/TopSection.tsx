'use client'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import styles from './TopSection.module.scss'
import { GroupDetail } from '@/types/groupDetail'
import Link from 'next/link'
import { Routes } from '@/enums/routes'
import { GroupMenu } from '@/components'

interface Props {
  group: GroupDetail
}

export const TopSection = ({ group }: Props) => {
  return (
    <div className={styles.container}>
      <Link href={Routes.GROUPS}>
        <IoArrowBack size={20} />
      </Link>
      <h4 className={styles.name}>{group.name}</h4>
      <GroupMenu groupId={group.id} />
    </div>
  )
}
