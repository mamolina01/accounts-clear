import { Link } from '@/lib/i18nNavigation'
import styles from './HeroSection.module.scss'
import { auth } from '@/auth.config'
import { Routes } from '@/enums/routes'
import { useTranslations } from 'next-intl'

export const HeroSection = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const t = useTranslations('home.heroSection')

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div>
          <h4 className={styles.title}>{t('welcome')}</h4>
          <h4 className={styles.subtitle}>Clear Accounts</h4>
          <p className={styles.description}>{t('splitWithFriends')}</p>
          <div className={styles.buttons}>
            {isAuthenticated ? (
              <Link href={Routes.GROUPS} className={styles.buttonBalances}>
                {t('myGroups')}
              </Link>
            ) : (
              <>
                <Link href={Routes.LOGIN} className={styles.buttonLogin}>
                  {t('login')}
                </Link>
                <Link href={Routes.REGISTER} className={styles.buttonRegister}>
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
