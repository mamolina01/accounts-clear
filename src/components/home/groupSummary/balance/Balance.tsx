'use client'
import { GroupProps } from '@/types/group'
import { getTotalByParticipant } from '@/utils'
import React from 'react'

export const Balance = ({ group }: { group: GroupProps }) => {
  const { costs, participants } = group

  const totalByParticipant = getTotalByParticipant(costs, participants)

  return (
    <div className="flex flex-col gap-2">
      {totalByParticipant.map(participant => (
        <div className="flex gap-2" key={participant.id}>
          <p>{participant.name}</p>
          <p>{participant.total}</p>
        </div>
      ))}
    </div>
  )
}
