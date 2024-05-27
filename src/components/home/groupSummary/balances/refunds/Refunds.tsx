import React from 'react'

interface Props {
  participantsToPay: (
    | {
        to: string
        amount: number
        from?: undefined
      }
    | {
        from: string
        amount: number
        to?: undefined
      }
  )[]
  id: string
  name: string
  total: number
}

export const Refunds = ({ refunds }: { refunds: Props[] }) => {
  return (
    <>
      {refunds.map(refund => (
        <div className="flex gap-2" key={refund.id}>
          <p>{refund.name}</p>
          {refund.participantsToPay.map(participant => (
            <>
              <p>{participant.to}</p>
              <p>{participant.amount}</p>
            </>
          ))}
        </div>
      ))}
    </>
  )
}
