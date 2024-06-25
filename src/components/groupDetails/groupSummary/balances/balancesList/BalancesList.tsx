import React from 'react'

interface Props {
  id: string
  name: string
  total: number
}

export const BalancesList = ({ balance }: { balance: Props[] }) => {
  const getTotal = (total: number) => {
    const totalAbsolute = Math.abs(total)

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
        name: 'text-start',
        total: `bg-red-800 rounded-l text-end`
      }
    } else if (total > 0) {
      return {
        name: 'text-end',
        total: `bg-green-700 rounded-r`
      }
    } else {
      return {
        name: 'text-end',
        total: ``
      }
    }
  }

  return (
    <>
      {balance.map(participant => (
        <div
          className={`flex w-full animate__animated animate__fadeIn ${participant.total < 0 ? 'flex-row-reverse' : ''}`}
          key={participant.id}
        >
          <p className={`${getClasses(participant.total).name} flex-1 px-2`}>{participant.name}</p>
          <p className={`${getClasses(participant.total).total} flex-1 px-2`}>{getTotal(participant.total)}</p>
        </div>
      ))}
    </>
  )
}
