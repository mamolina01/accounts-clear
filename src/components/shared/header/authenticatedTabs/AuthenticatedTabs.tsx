'use client'
import Link from 'next/link'
import styles from '../Header.module.scss'
import Image from 'next/image'
import { Routes } from '@/enums/routes'
import { signOut } from 'next-auth/react'
import { IoLogOutOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

interface Props {
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

export const AuthenticatedTabs = ({ user }: Props) => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href={Routes.GROUPS} className={`${styles.link} ${pathname === Routes.GROUPS ? styles.active : ''}`}>
        My groups
      </Link>
      <Link
        href={Routes.GROUP_FORM}
        className={`${styles.link} ${pathname === Routes.GROUP_FORM ? styles.active : ''}`}
      >
        New group
      </Link>
      <Link href={Routes.JOIN} className={`${styles.link} ${pathname === Routes.JOIN ? styles.active : ''}`}>
        Join group
      </Link>
      <div className={styles.userContainer}>
        <div className={styles.textContainer}>
          <p>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        {user.image && <Image src={user.image} alt="user_image" />}
        <button className={styles.signOut} onClick={() => signOut()}>
          <IoLogOutOutline size={30} />
        </button>
      </div>
    </nav>
  )
}
