import coin from '@/public/coin.svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.scss'
import { auth } from '@/auth.config'
import { SignOut } from './SignOut'

export const Header = async () => {
  const session = await auth()

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={coin} alt="coin" width={35} />
        <span className={styles.title}>Clear Accounts</span>
      </Link>

      {session?.user ? (
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Balances
          </Link>
          <div className={styles.userContainer}>
            <div className={styles.textContainer}>
              <p>{session.user.name}</p>
              <p className={styles.email}>{session.user.email}</p>
            </div>
            {session.user.image && <Image src={session.user.image} alt="" />}
            <SignOut />
          </div>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link href="/auth/login" className={styles.link}>
            Login
          </Link>
          <Link href="/auth/register" className={styles.register}>
            Register
          </Link>
        </nav>
      )}
    </header>
  )
}
