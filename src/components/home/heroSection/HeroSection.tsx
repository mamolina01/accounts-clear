import Link from 'next/link'
import styles from './HeroSection.module.scss'
import { auth } from '@/auth.config'

export const HeroSection = async () => {
  const session = await auth()

  const isAuthenticated = Boolean(session?.user)

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div>
          <h4 className={styles.title}>Welcome to</h4>
          <h4 className={styles.subtitle}>Clear Accounts</h4>
          <p className={styles.description}>Split your expenses with your friends!</p>
          <div className={styles.buttons}>
            {isAuthenticated ? (
              <Link href={'/auth/login'} className={styles.buttonBalances}>
                My Balances
              </Link>
            ) : (
              <>
                <Link href={'/auth/login'} className={styles.buttonLogin}>
                  Login
                </Link>
                <Link href={'/auth/register'} className={styles.buttonRegister}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
