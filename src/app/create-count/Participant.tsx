import { ParticipantProps } from '@/types/newBalance'
import React, { ChangeEvent, FormEventHandler, useState } from 'react'

interface ParticipantItemProps {
  participant: ParticipantProps
  editParticipant: (participant: ParticipantProps) => void
}

export const Participant = ({ participant, editParticipant }: ParticipantItemProps) => {
  const [tempParticipant, setTempParticipant] = useState(participant)

  const handleChange: FormEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setTempParticipant({ ...tempParticipant, name: e.target.value })
  }

  return (
    <div className="w-full flex justify-between gap-2">
      <input
        type="text"
        value={tempParticipant.name}
        className="bg-transparent outline-none mx-1 border-b-[1px] border-tertiary w-full focus:text-secondary"
        onChange={handleChange}
      />
      <button type="button" onClick={() => editParticipant(tempParticipant)}>
        Editar
      </button>
    </div>
  )
}
