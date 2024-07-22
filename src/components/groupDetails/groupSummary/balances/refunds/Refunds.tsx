import { useTranslations } from 'next-intl'
import { EmptyRefunds } from './emptyRefunds/EmptyRefunds'
import styles from './Refunds.module.scss'

interface Props {
  participantsToPay: (
    | {
        to: string
        amount: number
        from?: string
      }
    | {
        from: string
        amount: number
        to?: string
      }
  )[]
  id: string
  name: string
  total: number
}

export const Refunds = ({ refunds }: { refunds: Props[] }) => {
  const t = useTranslations('groupDetails.groupSummary.refunds')
  if (refunds.length === 0) {
    return <EmptyRefunds data-testid="empty-refunds" />
  }

  return (
    <>
      {refunds.map((refund, refundIndex) => (
        <div key={`refund-${refundIndex}`} className={styles.container}>
          {refund.participantsToPay.map(participant => (
            <div className={styles.participantContainer} key={`${refund.name} - ${participant.to}`}>
              <div className={styles.leftContainer}>
                <p className={styles.name}>{refund.name}</p>
                <p className={styles.mustPayTo}>{t('mustPayTo')}</p>
                <p className={styles.name}>{participant.to}</p>
              </div>
              <div className={styles.rightContainer}>
                <p className={styles.amount}>${participant.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
