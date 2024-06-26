import { Routes } from '@/enums/routes'
import styles from './MobileMenu.module.scss'
import { IoMenu } from 'react-icons/io5'
import Link from 'next/link'

interface Props {
  toggleMenu: () => void
}

export const MobileMenu = ({ toggleMenu }: Props) => {
  return (
    <div className={styles.nav}>
      <Link href={Routes.GROUPS} className="text-xl">
        GROUPS
      </Link>
    </div>
  )
}
