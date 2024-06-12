'use client'
import React, { FormEventHandler, useState } from 'react'

interface FormParticipantsProps {
  addParticipant(name: string): { ok: boolean }
}

export const ParticipantsForm = ({ addParticipant }: FormParticipantsProps) => {
  const [participantName, setParticipantName] = useState<string>('')

  const handleSubmit: FormEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    handleAddParticipant()
  }

  const handleAddParticipant = () => {
    if (participantName !== '') {
      const { ok } = addParticipant(participantName)
      if (ok) {
        setParticipantName('')
      }
    }
  }

  return (
    <div className="grid grid-cols-[1fr_50px] gap-3 mt-2 mx-1">
      <input
        type="text"
        value={participantName}
        placeholder="Participant name"
        onChange={e => setParticipantName(e.target.value)}
        onSubmit={handleSubmit}
        className={`bg-transparent text-secondary outline-none w-full border-b-[1px] border-transparent focus:border-tertiary`}
      />
      <button type="button" className="bg-sky-700 text-sm py-1 px-2 rounded" onClick={handleAddParticipant}>
        Add
      </button>
    </div>
  )
}
