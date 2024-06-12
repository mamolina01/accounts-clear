'use client'
import { updateGroup, createGroup } from '@/actions'
import { Participant } from '@/components/balanceForm/participant/Participant'
import { generateID } from '@/helpers'
import { validationSchemaNewBalance } from '@/validations'
import { Category } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { FormEventHandler } from 'react'
import styles from './BalanceForm.module.scss'
import { ParticipantsForm } from './participantsForm/ParticipantsForm'
import { GroupInfo, ParticipantGroup } from '@/types/group'
import toast from 'react-hot-toast'

interface Props {
  group: GroupInfo
}

export const BalanceForm = ({ group }: Props) => {
  const router = useRouter()

  const handleSubmit = async (values: GroupInfo) => {
    const data = {
      name: values.name,
      description: values.description,
      category: values.category,
      participants: values.participants
    }

    if (group) {
      const { ok } = await updateGroup(data, group?.id ?? '')

      if (ok) {
        toast.success('Successfully updated!')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    } else {
      const { ok } = await createGroup(data)

      if (ok) {
        toast.success('Successfully created!')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    }
  }

  const categoryOptions = [
    Category.Celebration,
    Category.House,
    Category.Project,
    Category.Relationship,
    Category.Travel,
    Category.Others
  ]

  return (
    <Formik
      initialValues={group}
      validateOnChange
      validationSchema={validationSchemaNewBalance()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
    >
      {props => {
        const { values, isValid, isValidating, errors, setFieldValue, handleSubmit, validateField } = props

        const addParticipant = (newParticipant: string) => {
          const usernameExists = values.participants.find(
            participant => participant.name.toLowerCase() === newParticipant.toLowerCase()
          )

          if (usernameExists) {
            toast.error('This username exists.')
            return { ok: false }
          }

          setFieldValue('participants', [
            ...values.participants,
            { name: newParticipant, id: generateID(), assignedCosts: [] }
          ])
          return { ok: true }
        }

        const editParticipant = (newParticipant: ParticipantGroup) => {
          const usernameExists = values.participants.find(
            participant => participant.name.toLowerCase() === newParticipant.name.toLowerCase()
          )

          if (usernameExists) {
            toast.error('This username exists.')
            return { ok: false }
          }

          const tempParticipants = values.participants.map(participant =>
            participant.id === newParticipant.id ? newParticipant : participant
          )
          setFieldValue('participants', tempParticipants)
          return { ok: true }
        }

        const removeParticipant = (participant: ParticipantGroup) => {
          if (participant.assignedCosts.length > 0) {
            toast.error('This user has assigned costs.')
            return
          }
          const tempParticipants = values.participants.filter(tempParticipant => tempParticipant.id !== participant.id)
          setFieldValue('participants', tempParticipants)
        }

        const onSubmit: FormEventHandler<HTMLFormElement> = e => {
          e.preventDefault()
          if (values.participants.length === 0) {
            validateField('participants')
          }
          handleSubmit()
        }

        return (
          <Form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={styles.label}>
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                placeholder="Enter a name"
                onChange={e => setFieldValue('name', e.target.value)}
                className={`${styles.input} ${errors.name && styles.error}`}
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                value={values.description}
                placeholder="Enter a description"
                onChange={e => setFieldValue('description', e.target.value)}
                className={`${styles.input} ${errors.description && styles.error}`}
              />
              {errors.description && <p className={styles.errorText}>{errors.description}</p>}
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.label}>
                Category
              </label>
              <select
                value={values.category}
                className={styles.input}
                onChange={e => setFieldValue('category', e.target.value)}
              >
                {categoryOptions.map(category => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.description}
            </div>
            <div className={styles.inputContainer}>
              <p className={styles.label}>
                Participants {'('}
                {values.participants.length}
                {')'}
              </p>

              <ParticipantsForm addParticipant={addParticipant} />
              <ul className={`${styles.participantList}`}>
                {values.participants.map(participant => (
                  <Participant
                    participant={participant}
                    editParticipant={editParticipant}
                    removeParticipant={removeParticipant}
                    key={participant.id}
                  />
                ))}
              </ul>
            </div>
            <button type="submit" disabled={!isValid || isValidating} className={styles.submitButton}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
