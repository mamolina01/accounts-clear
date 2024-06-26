'use client'
import coin from '@/public/coin.svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'
import { Routes } from '@/enums/routes'
import { AuthenticatedTabs } from './authenticatedTabs/AuthenticatedTabs'
import { IoMenu } from 'react-icons/io5'
import { MobileMenu } from './mobileMenu/MobileMenu'
import { useState } from 'react'
import { Session } from 'next-auth'

export const Header = ({ session }: { session: Session | null }) => {
  const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false)

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
              <IoMenu size={25} />
            </button>
            <AuthenticatedTabs user={session.user} />
          </>
        ) : (
          <>
            <nav className={styles.nav}>
              <Link href={Routes.LOGIN} className={styles.link}>
                Login
              </Link>
              <Link href={Routes.REGISTER} className={styles.register}>
                Register
              </Link>
            </nav>
          </>
        )}
      </header>
      {showMenuMobile && session?.user && <MobileMenu toggleMenu={toggleMenu} />}
    </div>
  )
}
