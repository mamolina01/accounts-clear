import coin from '@/public/coin.svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'
import { auth } from '@/auth.config'
import { Routes } from '@/enums/routes'
import { AuthenticatedTabs } from './authenticatedTabs/AuthenticatedTabs'

export const Header = async () => {
  const session = await auth()

  return (
    <header className={styles.header}>
      <Link href={Routes.HOME} className={styles.logo}>
        <Image src={coin} alt="coin" width={35} />
        <span className={styles.title}>Clear Accounts</span>
      </Link>

      {session?.user ? (
        <AuthenticatedTabs user={session.user} />
      ) : (
        <nav className={styles.nav}>
          <Link href={Routes.LOGIN} className={styles.link}>
            Login
          </Link>
          <Link href={Routes.REGISTER} className={styles.register}>
            Register
          </Link>
        </nav>
      )}
    </header>
  )
}
