'use client'
import { ParticipantProps } from '@/types/newBalance'
import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import { BsXLg, BsCheck2 } from 'react-icons/bs'

interface ParticipantItemProps {
  participant: ParticipantProps
  editParticipant: (participant: ParticipantProps) => void
  removeParticipant: (participant: ParticipantProps) => void
}

export const Participant = ({ participant, editParticipant, removeParticipant }: ParticipantItemProps) => {
  const [tempParticipant, setTempParticipant] = useState(participant)
  const [isEditting, setIsEditting] = useState(false)

  const handleChange: FormEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setTempParticipant({ ...tempParticipant, name: e.target.value })
  }

  const onClickEdit = () => {
    setIsEditting(false)
    if (tempParticipant.name === participant.name) return
    editParticipant(tempParticipant)
  }

  const onClickRemove = () => {
    removeParticipant(participant)
  }

  return (
    <div className="w-full flex justify-between gap-2 items-center animate__animated animate__fadeIn">
      <input
        type="text"
        value={tempParticipant.name}
        className="bg-transparent outline-none border-b-[1px] border-tertiary w-11/12 focus:text-secondary"
        onChange={handleChange}
        onFocus={() => setIsEditting(true)}
      />

      {isEditting ? <BsCheck2 onClick={onClickEdit} /> : <BsXLg onClick={onClickRemove} />}
    </div>
  )
}
