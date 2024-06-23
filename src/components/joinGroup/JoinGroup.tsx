'use client'
import { AiOutlineSelect } from 'react-icons/ai'
import styles from './JoinGroup.module.scss'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'
import { integrateUser } from '@/actions'
import toast from 'react-hot-toast'
import { useGeneralBehaviourStore, useModalsStore } from '@/store'
import { getCurrentUrl } from '@/utils'

interface Props {
  group: {
    id: string
    name: string
    description: string
    participants: Participant[]
  }
}

interface Participant {
  id: string
  name: string
  userId: string | null
}

export const JoinGroup = ({ group }: Props) => {
  const session = useSession()
  const router = useRouter()
  const { setIsAuthModalOpen } = useModalsStore(state => state)
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)

  const selectParticipant = async (participant: Participant) => {
    if (!session.data?.user) {
      setIsAuthModalOpen(true)
      const url = getCurrentUrl(group.id)
      setRedirectUrl(url)
      return
    }

    if (redirectUrl) {
      setRedirectUrl('')
    }

    const { ok } = await integrateUser(participant.id)
    if (ok) {
      toast.success('Successfully added!')
      setTimeout(() => {
        router.push(Routes.GROUPS)
      }, 1500)
    }
  }
  return (
    <div className={styles.container}>
      <p className={styles.subtitle}>Who of them are you?</p>
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
