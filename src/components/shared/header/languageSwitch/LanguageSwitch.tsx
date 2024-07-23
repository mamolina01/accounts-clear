import { useParams } from 'next/navigation'
import styles from './LanguageSwitch.module.scss'
import useSwitchLanguage from '@/hooks/useSwitchLanguage'
import { Locales } from '@/config/locales'

export const LanguageSwitch = () => {
  const { locale } = useParams()
  const switchLanguage = useSwitchLanguage()

  return (
    <div className={styles.languageContainer}>
      <button className={`${locale === Locales.EN ? styles.active : ''}`} onClick={() => switchLanguage(Locales.EN)}>
        EN
      </button>
      <span>|</span>
      <button className={`${locale === Locales.ES ? styles.active : ''}`} onClick={() => switchLanguage(Locales.ES)}>
        ES
      </button>
    </div>
  )
}
