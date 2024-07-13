import styles from './BalancesList.module.scss'

interface Props {
  id: string
  name: string
  total: number
}

export const BalancesList = ({ balance }: { balance: Props[] }) => {
  const getTotal = (total: number) => {
    const totalAbsolute = Math.abs(total).toFixed(2)

    if (total < 0) {
      return `- $${totalAbsolute}`
    } else if (total > 0) {
      return `+ $${totalAbsolute}`
    } else {
      return `$${totalAbsolute}`
    }
  }

  const getClasses = (total: number) => {
    if (total < 0) {
      return {
        name: styles.rightText,
        total: styles.leftTotal
      }
    } else if (total > 0) {
      return {
        name: styles.leftText,
        total: styles.rightTotal
      }
    } else {
      return {
        name: styles.leftText,
        total: ``
      }
    }
  }

  return (
    <>
      {balance.map(participant => (
        <div
          className={`${styles.container} ${participant.total < 0 ? styles.reverse : ''}`}
          key={participant.id}
          data-testid="balance"
        >
          <p className={`${getClasses(participant.total).name} ${styles.balance}`}>{participant.name}</p>
          <p className={`${getClasses(participant.total).total} ${styles.balance}`}>{getTotal(participant.total)}</p>
        </div>
      ))}
    </>
  )
}
