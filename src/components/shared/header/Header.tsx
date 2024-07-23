'use client'
import coin from '@/public/coin.svg'
import { Link } from '@/lib/i18nNavigation'
import Image from 'next/image'
import styles from './Header.module.scss'
import { Routes } from '@/enums/routes'
import { AuthenticatedTabs } from './authenticatedTabs/AuthenticatedTabs'
import { IoMenu } from 'react-icons/io5'
import { MobileMenu } from './mobileMenu/MobileMenu'
import { useState } from 'react'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { LanguageSwitch } from './languageSwitch/LanguageSwitch'

export const Header = ({ session }: { session: Session | null }) => {
  const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)
  const t = useTranslations('layout.header')
  const toggleMenu = () => {
    setShowMenuMobile(!showMenuMobile)
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link href={Routes.HOME} className={styles.logo}>
          <Image src={coin} alt="coin" width={35} />
          <span className={styles.title}>Clear Accounts</span>
        </Link>

        {session?.user ? (
          <>
            <button onClick={toggleMenu} className={styles.hamburguerMenu}>
              <IoMenu size={30} />
            </button>
            <AuthenticatedTabs user={session.user} />
          </>
        ) : (
          <nav className={styles.nav}>
            <LanguageSwitch />
            <Link href={Routes.LOGIN} className={styles.link}>
              {t('login')}
            </Link>
            <Link href={Routes.REGISTER} className={styles.register}>
              {t('register')}
            </Link>
          </nav>
        )}
      </header>
      {showMenuMobile && session?.user && <MobileMenu toggleMenu={toggleMenu} user={session.user} />}
    </div>
  )
}
