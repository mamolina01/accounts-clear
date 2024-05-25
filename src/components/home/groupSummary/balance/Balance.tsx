'use client'
import { GroupProps } from '@/types/group'
import { getBalance, getRefunds, getTotalAssignedByParticipant, getTotalPaidByParticipant } from '@/utils'

export const Balance = ({ group }: { group: GroupProps }) => {
  const { costs, participants } = group

  const totalPaidByParticipant = getTotalPaidByParticipant(costs, participants)

  const balance = getBalance(costs, participants)

  const refunds = getRefunds(balance)

  //   console.log({ totalPaidByParticipant })
  //   console.log({ totalAssignedByParticipant })

  return (
    <div className="flex flex-col gap-2">
      {totalPaidByParticipant.map(participant => (
        <div className="flex gap-2 bg-secondary px-3 py-1 justify-between rounded" key={participant.id}>
          <p className="text-lg">{participant.name}</p>
          {/* <p className="text-xl text-primary">${participant.total}</p> */}
        </div>
      ))}
    </div>
  )
}
