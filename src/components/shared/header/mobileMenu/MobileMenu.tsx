import { Routes } from '@/enums/routes'
import styles from './MobileMenu.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface Props {
  toggleMenu: () => void
}

export const MobileMenu = ({ toggleMenu }: Props) => {
  const pathname = usePathname()

  const getStyles = (route: string) => {
    return `${styles.tab} ${pathname === route ? styles.active : ''}`
  }

  return (
    <div className={styles.nav}>
      <Link onClick={toggleMenu} href={Routes.HOME} className={getStyles(Routes.HOME)}>
        Home
      </Link>
      <Link onClick={toggleMenu} href={Routes.GROUPS} className={getStyles(Routes.GROUPS)}>
        My Groups
      </Link>
      <Link onClick={toggleMenu} href={Routes.GROUP_FORM} className={getStyles(Routes.GROUP_FORM)}>
        New group
      </Link>
      <Link onClick={toggleMenu} href={Routes.JOIN} className={getStyles(Routes.JOIN)}>
        Join group
      </Link>
      <button className={styles.tab} onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
}
