'use client'
import styles from '../Header.module.scss'
import Image from 'next/image'
import { Routes } from '@/enums/routes'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link, usePathname } from '@/lib/i18nNavigation'
import { logout } from '@/actions/auth/signout'
import { useTranslations } from 'next-intl'
import { LanguageSwitch } from '../languageSwitch/LanguageSwitch'
import { useModalsStore } from '@/store'

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
  const t = useTranslations('layout.header')
  const { isJoinGroupModalOpen, setIsJoinGroupModalOpen } = useModalsStore(state => state)

  const toggleJoinGroupModal = () => {
    setIsJoinGroupModalOpen(!isJoinGroupModalOpen)
  }

  const signOut = async () => {
    await logout()
  }

  return (
    <nav className={`${styles.nav} ${styles.authenticated}`}>
      <Link href={Routes.GROUPS} className={`${styles.link} ${pathname === Routes.GROUPS ? styles.active : ''}`}>
        {t('myGroups')}
      </Link>
      <Link
        href={Routes.GROUP_FORM}
        className={`${styles.link} ${pathname === Routes.GROUP_FORM ? styles.active : ''}`}
      >
        {t('newGroup')}
      </Link>
      <button className={`${styles.link} ${isJoinGroupModalOpen ? styles.active : ''}`} onClick={toggleJoinGroupModal}>
        {t('joinGroup')}
      </button>
      <LanguageSwitch />
      <div className={styles.userContainer}>
        <div className={styles.textContainer}>
          <p>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        {user.image && <Image src={user.image} alt="user_image" width={28} height={28} className={styles.userImage} />}
        <button onClick={() => signOut()}>
          <IoLogOutOutline className={styles.signOut} />
        </button>
      </div>
    </nav>
  )
}
