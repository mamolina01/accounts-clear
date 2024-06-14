import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import icon from '@/public/emptyCosts.svg'
import { Routes } from '@/enums/routes'

export const EmptyCosts = ({ groupId }: { groupId: string }) => {
  return (
    <Link href={`${Routes.COST_FORM}/${groupId}`} className="flex flex-col gap-3 bg-primary py-5 rounded items-center">
      <Image src={icon} alt="emptyCosts" className=" h-16 w-16" />
      <p className="text-tertiary text-lg">Add your first cost</p>
    </Link>
  )
}
