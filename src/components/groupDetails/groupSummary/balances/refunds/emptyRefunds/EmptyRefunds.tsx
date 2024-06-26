import Image from 'next/image'
import exchangeOff from '/public/exchangeOff.svg'
import styles from './EmptyRefunds.module.scss'

export const EmptyRefunds = () => {
  return (
    <div className={styles.container}>
      <Image src={exchangeOff} alt="exchangeOff" className={styles.icon} />
      <p className={styles.text}>No necessary refunds</p>
    </div>
  )
}
