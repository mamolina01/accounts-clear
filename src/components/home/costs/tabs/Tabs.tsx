'use client'
import { useState } from 'react'
import { BsFillBarChartFill } from 'react-icons/bs'
import { IoMdMenu } from 'react-icons/io'
import styles from './Tabs.module.scss'

export const Tabs = () => {
  const [tabActive, setTabActive] = useState('costs')
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${tabActive === 'costs' ? styles.active : ''}`}
        onClick={() => setTabActive('costs')}
      >
        <IoMdMenu className={styles.icon} />
        <span>Costs</span>
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
