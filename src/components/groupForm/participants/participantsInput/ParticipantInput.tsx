'use client'
import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import styles from '../Participants.module.scss'

interface FormParticipantsProps {
  error: string
  addParticipant: (name: string) => { ok: boolean }
  setError: (value: string) => void
}

export const ParticipantInput = ({ error, addParticipant, setError }: FormParticipantsProps) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParticipantName(e.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <div className={styles.participantInput}>
      <input
        type="text"
        value={participantName}
        placeholder="Participant name"
        onChange={handleChange}
        onSubmit={handleSubmit}
        className={styles.input}
      />
      <button type="button" className={styles.button} onClick={handleAddParticipant}>
        Add
      </button>
      <p className={styles.errorText}>{error}</p>
    </div>
  )
}
