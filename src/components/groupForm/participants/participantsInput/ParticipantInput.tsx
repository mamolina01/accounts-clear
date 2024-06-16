'use client'
import React, { FormEventHandler, useState } from 'react'
import styles from '../Participants.module.scss'

interface FormParticipantsProps {
  addParticipant(name: string): { ok: boolean }
}

export const ParticipantInput = ({ addParticipant }: FormParticipantsProps) => {
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
    <div className={styles.participantInput}>
      <input
        type="text"
        value={participantName}
        placeholder="Participant name"
        onChange={e => setParticipantName(e.target.value)}
        onSubmit={handleSubmit}
        className={styles.input}
      />
      <button type="button" className={styles.button} onClick={handleAddParticipant}>
        Add
      </button>
    </div>
  )
}
