'use client'
import { AiOutlineSelect } from 'react-icons/ai'
import styles from './JoinGroup.module.scss'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'
import toast from 'react-hot-toast'
import { useGeneralBehaviourStore, useModalsStore } from '@/store'
import { getCurrentUrl } from '@/utils'
import { integrateUser } from '@/actions/participants/integrate-user'
import { useEffect, useState } from 'react'
import { FormContainer } from '@/components'
import { useTranslations } from 'next-intl'

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
  const [baseUrl, setBaseUrl] = useState<string>('')
  const t = useTranslations('join.joinGroup')

  useEffect(() => {
    if (group.id) {
      const url = getCurrentUrl(group.id)
      setBaseUrl(url)
    }
  }, [group.id])

  const selectParticipant = async (participant: Participant) => {
    if (!session.data?.user) {
      setIsAuthModalOpen(true)
      setRedirectUrl(baseUrl)
      return
    }

    if (redirectUrl) {
      setRedirectUrl('')
    }

    const { ok } = await integrateUser(participant.id, group.id)
    if (ok) {
      toast.success(t('success'))
      setTimeout(() => {
        router.push(Routes.GROUPS)
      }, 1500)
    }
  }
  return (
    <FormContainer title={`${t('title')} ${group.name}`}>
      <div className={styles.container}>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        <label className={styles.label}>{t('participants')}</label>
        <div className={styles.participantList}>
          {group?.participants.map(participant => (
            <div
              key={participant.id}
              className={`${styles.participant} ${participant.userId ? styles.disabled : ''}`}
              onClick={() => selectParticipant(participant)}
            >
              <span>{participant.name}</span>
              {!participant.userId && <AiOutlineSelect className={styles.icon} />}
            </div>
          ))}
        </div>
      </div>
    </FormContainer>
  )
}
