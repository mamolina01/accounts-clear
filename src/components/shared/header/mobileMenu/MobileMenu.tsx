import { Routes } from '@/enums/routes'
import styles from './MobileMenu.module.scss'
import { Link, usePathname } from '@/lib/i18nNavigation'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { LanguageSwitch } from '../languageSwitch/LanguageSwitch'
import { useModalsStore } from '@/store'

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
  const t = useTranslations('layout.header')
  const { isJoinGroupModalOpen, setIsJoinGroupModalOpen } = useModalsStore(state => state)

  const toggleJoinGroupModal = () => {
    toggleMenu()
    setIsJoinGroupModalOpen(!isJoinGroupModalOpen)
  }

  const getStyles = (route: string) => {
    return `${styles.tab} ${pathname === route ? styles.active : ''}`
  }

  return (
    <div className={styles.nav}>
      <div className={styles.userContainer}>
        <div className={`${styles.textContainer} ${user.image ? styles.imageExists : ''}`}>
          <p>{user.name}</p>
          <p className={styles.email}>{user.email}</p>
        </div>
        {user.image && <Image src={user.image} alt="user_image" width={28} height={28} className={styles.userImage} />}
      </div>

      <Link onClick={toggleMenu} href={Routes.HOME} className={getStyles(Routes.HOME)}>
        {t('home')}
      </Link>
      <Link onClick={toggleMenu} href={Routes.GROUPS} className={getStyles(Routes.GROUPS)}>
        {t('myGroups')}
      </Link>
      <Link onClick={toggleMenu} href={Routes.GROUP_FORM} className={getStyles(Routes.GROUP_FORM)}>
        {t('newGroup')}
      </Link>
      <button onClick={toggleJoinGroupModal} className={styles.tab}>
        {t('joinGroup')}
      </button>
      <button className={styles.tab} onClick={() => signOut()}>
        {t('logout')}
      </button>
      <LanguageSwitch />
    </div>
  )
}
