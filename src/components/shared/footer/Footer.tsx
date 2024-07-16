import Link from 'next/link'
import styles from './Footer.module.scss'
import { useTranslations } from 'next-intl'

export const Footer = () => {
  const t = useTranslations('layout.footer')
  return (
    <footer className={styles.footer}>
      <Link href="https://matiasnmolina.com" target="_blank" className={styles.text}>
        Matias Molina
      </Link>
      <span> | {t('frontendDeveloper')}</span>
    </footer>
  )
}
