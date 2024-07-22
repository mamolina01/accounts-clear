'use client'
import { useTranslations } from 'next-intl'
import styles from './TabsBalances.module.scss'
import { GrMoney } from 'react-icons/gr'
import { MdCurrencyExchange } from 'react-icons/md'

interface Props {
  activeTab: string
  setActiveTab: (value: string) => void
}

export const TabsBalances = ({ activeTab, setActiveTab }: Props) => {
  const t = useTranslations('groupDetails.groupSummary.tabsBalances')
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${activeTab === 'balances' ? styles.active : ''}`}
        onClick={() => setActiveTab('balances')}
      >
        <MdCurrencyExchange className={styles.icon} />
        <span>Balances</span>
      </button>
      <button
        className={`${styles.button} ${activeTab === 'refunds' ? styles.active : ''}`}
        onClick={() => setActiveTab('refunds')}
      >
        <GrMoney className={styles.icon} />
        <span>{t('refunds')}</span>
      </button>
    </div>
  )
}
