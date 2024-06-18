'use client'
import { AiOutlineSelect } from 'react-icons/ai'
import styles from './JoinGroup.module.scss'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'
import { integrateUser } from '@/actions'

interface Props {
  group: {
    name: string
    description: string
    participants: Participant[]
  } | null
}

interface Participant {
  id: string
  name: string
  userId: string | null
}

export const JoinGroup = ({ group }: Props) => {
  const session = useSession()
  const router = useRouter()
  const selectParticipant = async (participant: Participant) => {
    if (!session.data?.user) {
      Swal.fire({
        title: 'You need to login to continue',
        icon: 'warning',
        background: '#151515',
        color: '#ffffff',
        confirmButtonColor: '#0284c7',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Register'
      }).then(async result => {
        if (result.isConfirmed) {
          router.push(Routes.LOGIN)
        } else {
          router.push(Routes.REGISTER)
        }
      })
      return
    }

    const { ok } = await integrateUser(participant.id)
    
    console.log('selecting participant')
  }
  return (
    <div className={styles.container}>
      <p>Who of them are you?</p>
      <label className={styles.label}>Participants</label>
      <div className={styles.participantList}>
        {group?.participants.map(participant => (
          <div
            key={participant.id}
            className={`${styles.participant} ${participant.userId ? styles.disabled : ''}`}
            onClick={() => selectParticipant(participant)}
          >
            <span>{participant.name}</span>
            {!participant.userId && <AiOutlineSelect size={20} className={styles.icon} />}
          </div>
        ))}
      </div>
    </div>
  )
}
