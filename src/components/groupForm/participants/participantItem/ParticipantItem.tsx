'use client'
import { ParticipantGroup as ParticipantProps } from '@/types/group'
import React, { ChangeEvent, FormEventHandler, KeyboardEvent, useEffect, useRef, useState } from 'react'
import styles from '../Participants.module.scss'
import Image from 'next/image'
import check from '@/public/check.svg'
import iconX from '@/public/iconX.svg'
import { useOutsideClick } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useModalsStore } from '@/store'

interface Props {
  participant: ParticipantProps
  editParticipant: (participant: ParticipantProps) => { ok: boolean }
  removeParticipant: (participant: ParticipantProps) => void
}

export const ParticipantItem = ({ participant, editParticipant, removeParticipant }: Props) => {
  const [tempParticipant, setTempParticipant] = useState(participant)
  const [isEditting, setIsEditting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()
  const [isUserParticipant, setIsUserParticipant] = useState<boolean>(true)
  const { isNoRemoveParticipantModalOpen: isOpen, setNoRemoveParticipantModalOpen: setIsOpen } = useModalsStore(
    state => state
  )
  useEffect(() => {
    if (session) {
      setIsUserParticipant(session?.user.name.toLowerCase() === participant.name.toLowerCase())
    }
  }, [session, participant.name])

  const handleChange: FormEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setTempParticipant({ ...tempParticipant, name: e.target.value })
  }

  const onEdit = () => {
    if (tempParticipant.name === participant.name) return
    const { ok } = editParticipant(tempParticipant)

    if (ok) {
      setIsEditting(false)
      inputRef.current?.blur()
    }
  }

  const onRemove = () => {
    if (participant.assignedCosts?.length !== 0) {
      setIsOpen(true)
    } else {
      removeParticipant(participant)
    }
  }

  const onLeaveInput = () => {
    if (tempParticipant.name === participant.name) {
      setIsEditting(false)
      return
    }

    const { ok } = editParticipant(tempParticipant)

    if (!ok) {
      setTempParticipant(participant)
      setIsEditting(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEdit()
    }
  }

  useOutsideClick(inputRef, onLeaveInput)

  return (
    <li className={styles.participantItem}>
      <input
        type="text"
        ref={inputRef}
        value={tempParticipant.name}
        disabled={isUserParticipant}
        className={`${styles.input} ${isEditting ? styles.active : ''}`}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsEditting(true)}
      />

      {!isUserParticipant &&
        (isEditting ? (
          <Image alt="check" src={check} height={25} width={25} onClick={onEdit} className={styles.button} />
        ) : (
          <Image alt="iconX" src={iconX} onClick={onRemove} className={styles.button} />
        ))}
    </li>
  )
}
