import { getBalance, getRefunds } from '@/utils'
import { BalancesList } from './balancesList/BalancesList'
import { useState } from 'react'
import { Refunds } from './refunds/Refunds'
import { TabsBalances } from './tabsBalances/TabsBalances'
import { GroupDetail } from '@/types/groupDetail'
import styles from './Balance.module.scss'
interface Props {
  group: GroupDetail
}

export const Balances = ({ group }: Props) => {
  const { costs, participants } = group
  const [activeTab, setActiveTab] = useState<string>('balances')

  const balance = getBalance(costs, participants)
  const refunds = getRefunds(costs, participants)

  return (
    <>
      <div className={styles.container}>
        {activeTab === 'refunds' ? <Refunds refunds={refunds} /> : <BalancesList balance={balance} />}
      </div>
      <TabsBalances activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}
