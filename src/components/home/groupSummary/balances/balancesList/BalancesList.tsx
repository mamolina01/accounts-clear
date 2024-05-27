import React from 'react'

interface Props {
  id: string
  name: string
  total: number
}

export const BalancesList = ({ balance }: { balance: Props[] }) => {
  return (
    <>
      {balance.map(participant => (
        <div className={`flex w-full ${participant.total < 0 ? 'flex-row-reverse' : ''}`} key={participant.id}>
          <p className={`${participant.total > 0 ? 'text-end' : 'text-start'} flex-1 px-2`}>{participant.name}</p>
          <p
            className={`${
              participant.total > 0 ? 'bg-green-700 rounded-r' : ' bg-red-800 rounded-l text-end'
            } flex-1 px-2`}
          >
            {participant.total > 0 && '+'}
            {participant.total}
          </p>
        </div>
      ))}
    </>
  )
}
