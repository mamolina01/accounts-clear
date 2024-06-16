import Link from 'next/link'
import styles from './HeroSection.module.scss'
import { auth } from '@/auth.config'
import { Routes } from '@/enums/routes'

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
              <Link href={Routes.GROUPS} className={styles.buttonBalances}>
                My Groups
              </Link>
            ) : (
              <>
                <Link href={Routes.LOGIN} className={styles.buttonLogin}>
                  Login
                </Link>
                <Link href={Routes.REGISTER} className={styles.buttonRegister}>
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
