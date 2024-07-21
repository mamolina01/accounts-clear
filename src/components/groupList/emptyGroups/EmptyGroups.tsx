import Image from 'next/image'
import icon from '@/public/emptyGroups.svg'
import { Routes } from '@/enums/routes'
import styles from './EmptyGroups.module.scss'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18nNavigation'

export const EmptyGroups = () => {
  const t = useTranslations('groupList')

  return (
    <Link href={`${Routes.GROUP_FORM}`} className={styles.link}>
      <Image src={icon} alt="emptyCosts" className={styles.icon} />
      <span className={styles.text}>{t('createYourGroup')}</span>
    </Link>
  )
}
