import Image from 'next/image'
import Link from 'next/link'
import icon from '@/public/emptyGroups.svg'
import { Routes } from '@/enums/routes'

export const EmptyGroups = () => {
  return (
    <Link href={`${Routes.GROUP_FORM}`} className="flex flex-col gap-3 py-5 rounded items-center">
      <Image src={icon} alt="emptyCosts" className=" h-16 w-16" />
      <p className="text-tertiary text-lg">Create your first group</p>
    </Link>
  )
}
