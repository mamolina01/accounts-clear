import { Routes } from '@/enums/routes'
import styles from './MobileMenu.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface Props {
  toggleMenu: () => void
  user: {
    id: string
    name: string
    email: string
    emailVerified?: string | undefined
    image?: string | undefined
    groups: {
      id: string
    }[]
  }
}

export const MobileMenu = ({ toggleMenu, user }: Props) => {
  const pathname = usePathname()

  const getStyles = (route: string) => {
    return `${styles.tab} ${pathname === route ? styles.active : ''}`
  }

  return (
    <div className={styles.nav}>
      <div className={styles.userContainer}>
        <div className={styles.textContainer}>
          <p>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        {user.image && <Image src={user.image} alt="user_image" />}
      </div>

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
