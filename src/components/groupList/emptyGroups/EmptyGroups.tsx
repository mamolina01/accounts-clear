import Image from 'next/image'
import Link from 'next/link'
import icon from '@/public/emptyGroups.svg'
import { Routes } from '@/enums/routes'
import styles from './EmptyGroups.module.scss'

export const EmptyGroups = () => {
  return (
    <Link href={`${Routes.GROUP_FORM}`} className={styles.link}>
      <Image src={icon} alt="emptyCosts" className={styles.icon} />
      <span className={styles.text}>Create your first group</span>
    </Link>
  )
}
