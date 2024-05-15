'use client'
import React, { FormEventHandler, useState } from 'react'

interface FormParticipantsProps {
  addParticipant(name: string): void
}

export const FormParticipants = ({ addParticipant }: FormParticipantsProps) => {
  const [participantName, setParticipantName] = useState<string>('')

  const handleSubmit: FormEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    handleAddParticipant()
  }

  const handleAddParticipant = () => {
    if (participantName !== '') {
      addParticipant(participantName)
      setParticipantName('')
    }
  }

  return (
    <div className="flex justify-between w-full gap-2 mt-4 px-1">
      <input
        type="text"
        value={participantName}
        placeholder="Nombre del participante"
        onChange={e => setParticipantName(e.target.value)}
        onSubmit={handleSubmit}
        className={`bg-transparent text-secondary outline-none w-10/12 border-b-[1px] border-transparent focus:border-tertiary`}
      />
      <button type="button" className="bg-blue-500 text-sm py-1 px-2 rounded-sm" onClick={handleAddParticipant}>
        Añadir
      </button>
    </div>
  )
}
