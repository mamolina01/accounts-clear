'use client'
import { ParticipantGroup as ParticipantProps } from '@/types/group'
import React, { ChangeEvent, FormEventHandler, useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import styles from '../Participants.module.scss'
import Image from 'next/image'
import check from '@/public/check.svg'
import iconX from '@/public/iconX.svg'
import { useOutsideClick } from '@/hooks'
import { useSession } from 'next-auth/react'

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

  useEffect(() => {
    if (session) {
      setIsUserParticipant(session?.user.name.toLowerCase() === participant.name.toLowerCase())
    }
  }, [session])

  const handleChange: FormEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setTempParticipant({ ...tempParticipant, name: e.target.value })
  }

  const onClickEdit = () => {
    if (tempParticipant.name === participant.name) return
    const { ok } = editParticipant(tempParticipant)

    if (ok) {
      setIsEditting(false)
    }
  }

  const onClickRemove = () => {
    if (participant.assignedCosts?.length !== 0) {
      Swal.fire({
        title: "Couldn't be removed",
        text: "This user couldn't be able to be removed, because he has costs assigned to him. ",
        icon: 'warning',
        background: '#151515',
        color: '#ffffff',
        confirmButtonColor: '#0284c7'
      })
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
        onFocus={() => setIsEditting(true)}
      />

      {!isUserParticipant &&
        (isEditting ? (
          <Image alt="check" src={check} height={25} width={25} onClick={onClickEdit} className={styles.button} />
        ) : (
          <Image alt="iconX" src={iconX} onClick={onClickRemove} className={styles.button} />
        ))}
    </li>
  )
}
