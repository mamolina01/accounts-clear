'use client'
import { BsFillBarChartFill } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'
import styles from './Tabs.module.scss'
import { useTranslations } from 'next-intl'

interface Props {
  tabActive: string
  setTabActive: (value: string) => void
}

export const Tabs = ({ tabActive, setTabActive }: Props) => {
  const t = useTranslations('groupDetails.groupSummary.tabs')
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${tabActive === 'costs' ? styles.active : ''}`}
        onClick={() => setTabActive('costs')}
      >
        <IoMdMenu className={styles.icon} />
        <span>{t('costs')}</span>
      </button>
      <button
        className={`${styles.button} ${tabActive === 'balance' ? styles.active : ''}`}
        onClick={() => setTabActive('balance')}
      >
        <BsFillBarChartFill className={styles.icon} />
        <span>Balance</span>
      </button>
    </div>
  )
}
