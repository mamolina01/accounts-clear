import { ParticipantItem } from './participantItem/ParticipantItem'
import { ParticipantInput } from './participantsInput/ParticipantInput'
import styles from './Participants.module.scss'
import { GroupInfo, ParticipantGroup } from '@/types/group'
import toast from 'react-hot-toast'
import { generateID } from '@/helpers'
import { FormikErrors } from 'formik'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  participants: ParticipantGroup[]
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<GroupInfo>>
}

export const Participants = ({ participants, setFieldValue }: Props) => {
  const [error, setError] = useState<string>('')
  const t = useTranslations('groupForm')

  const addParticipant = (newParticipant: string) => {
    const usernameExists = participants.find(
      participant => participant.name.toLowerCase() === newParticipant.toLowerCase()
    )

    if (usernameExists) {
      setError(t('usernameExists'))
      return { ok: false }
    }

    setFieldValue('participants', [...participants, { name: newParticipant, id: generateID(), assignedCosts: [] }])
    return { ok: true }
  }

  const editParticipant = (newParticipant: ParticipantGroup) => {
    const usernameExists = participants.find(
      participant => participant.name.toLowerCase() === newParticipant.name.toLowerCase()
    )

    if (usernameExists) {
      setError(t('usernameExists'))
      return { ok: false }
    }

    const tempParticipants = participants.map(participant =>
      participant.id === newParticipant.id ? newParticipant : participant
    )
    setFieldValue('participants', tempParticipants)
    return { ok: true }
  }

  const removeParticipant = (participant: ParticipantGroup) => {
    if (participant.assignedCosts.length > 0) {
      toast.error(t('userHasAssignedCost'))
      return
    }
    const tempParticipants = participants.filter(tempParticipant => tempParticipant.id !== participant.id)
    setFieldValue('participants', tempParticipants)
  }
  return (
    <>
      <ParticipantInput addParticipant={addParticipant} error={error} setError={setError} />
      <ul className={`${styles.participantList}`}>
        {participants.map(participant => (
          <ParticipantItem
            participant={participant}
            editParticipant={editParticipant}
            removeParticipant={removeParticipant}
            key={participant.id}
          />
        ))}
      </ul>
    </>
  )
}
