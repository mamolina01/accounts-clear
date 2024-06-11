'use client'
import { ParticipantGroup as ParticipantProps } from '@/types/group'
import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import { BsXLg, BsCheck2 } from 'react-icons/bs'
import Swal from 'sweetalert2'
import styles from './Participant.module.scss'
import Image from 'next/image'
import check from '/public/check.svg'
import iconX from '/public/iconX.svg'

interface Props {
  participant: ParticipantProps
  editParticipant: (participant: ParticipantProps) => void
  removeParticipant: (participant: ParticipantProps) => void
}

export const Participant = ({ participant, editParticipant, removeParticipant }: Props) => {
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

  return (
    <li className={styles.container}>
      <input
        type="text"
        value={tempParticipant.name}
        className={`${styles.input} ${isEditting ? styles.active : ''}`}
        onChange={handleChange}
        onFocus={() => setIsEditting(true)}
      />

      <div className="flex justify-center items-center w-full">
        {isEditting ? (
          <Image alt="check" src={check} height={25} width={25} onClick={onClickEdit} className="cursor-pointer" />
        ) : (
          <Image alt="iconX" src={iconX} onClick={onClickRemove} className="cursor-pointer" />
        )}
      </div>
    </li>
  )
}
