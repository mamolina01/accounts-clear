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
      {refunds.map((refund, refundIndex) => (
        <div key={`refund-${refundIndex}`} className="flex flex-col gap-2">
          {refund.participantsToPay.map(participant => (
            <div className="grid grid-cols-2 gap-2 bg-secondary p-2 rounded" key={`${refund.name} - ${participant.to}`}>
              <div className="flex flex-col">
                <p>{refund.name}</p>
                <p className="text-xs text-tertiary">must pay to</p>
                <p>{participant.to}</p>
              </div>
              <div className="flex flex-col items-end justify-center">
                <p className="text-primary text-xl">${participant.amount}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
