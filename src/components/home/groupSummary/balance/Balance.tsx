import { GroupProps } from '@/types/group'
import { getBalance, getRefunds } from '@/utils'

export const Balance = ({ group }: { group: GroupProps }) => {
  const { costs, participants } = group

  const balance = getBalance(costs, participants)
  const refunds = getRefunds(costs, participants)

  return (
    <div className="flex flex-col gap-2">
      {/* {refunds.map(refund => (
        <div className="flex gap-2" key={refund.id}>
          <p>{refund.name}</p>
          {refund.participantsToPay.map(participant => (
            <>
              <p>{participant.to}</p>
              <p>{participant.amount}</p>
            </>
          ))}
        </div>
      ))} */}

      {balance.map(participant => (
        <div className={`flex w-full ${participant.total < 0 ? 'flex-row-reverse' : ''}`} key={participant.id}>
          <p className={`${participant.total > 0 ? 'text-end' : 'text-start'} flex-1 px-2`}>{participant.name}</p>
          <p className={`${participant.total > 0 ? 'bg-green-700' : ' bg-red-800 text-end'} flex-1 px-2`}>
            {participant.total > 0 && '+'}
            {participant.total}
          </p>
        </div>
      ))}
    </div>
  )
}
