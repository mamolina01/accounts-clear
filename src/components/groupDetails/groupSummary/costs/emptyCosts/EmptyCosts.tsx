import Image from 'next/image'
import Link from 'next/link'
import icon from '@/public/emptyCosts.svg'
import { Routes } from '@/enums/routes'
import styles from './EmptyCosts.module.scss'

export const EmptyCosts = ({ groupId }: { groupId: string }) => {
  return (
    <Link href={`${Routes.COST_FORM}/${groupId}`} className={styles.container}>
      <Image src={icon} alt="emptyCosts" className={styles.icon} />
      <p className={styles.text}>Add your first cost</p>
    </Link>
  )
}
