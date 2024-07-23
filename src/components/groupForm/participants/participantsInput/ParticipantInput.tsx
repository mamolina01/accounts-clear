'use client'
import React, { ChangeEvent, FormEventHandler, KeyboardEvent, useState } from 'react'
import styles from '../Participants.module.scss'
import { useTranslations } from 'next-intl'

interface FormParticipantsProps {
  error: string
  addParticipant: (name: string) => { ok: boolean }
  setError: (value: string) => void
}

export const ParticipantInput = ({ error, addParticipant, setError }: FormParticipantsProps) => {
  const [participantName, setParticipantName] = useState<string>('')
  const t = useTranslations('groupForm')

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddParticipant()
    }
  }

  return (
    <div className={styles.participantInput}>
      <input
        type="text"
        value={participantName}
        placeholder={t('participants.placeholder')}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <button type="button" className={styles.button} onClick={handleAddParticipant}>
        {t('participants.addButton')}
      </button>
      <p className={styles.errorText}>{error}</p>
    </div>
  )
}
