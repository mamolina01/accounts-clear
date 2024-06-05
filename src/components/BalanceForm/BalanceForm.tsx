'use client'
import { updateGroup, createGroup } from '@/actions'
import { Participant } from '@/components/balanceForm/participant/Participant'
import { generateID } from '@/helpers'
import { validationSchemaNewBalance } from '@/validations'
import { Category } from '@prisma/client'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEventHandler } from 'react'
import styles from './BalanceForm.module.scss'
import { ParticipantsForm } from './participantsForm/ParticipantsForm'
import { GroupInfo, ParticipantGroup } from '@/types/group'
import toast from 'react-hot-toast'

interface Props {
  group: GroupInfo | null
}

export const BalanceForm = ({ group }: Props) => {
  const initialValues: GroupInfo = { name: '', description: '', category: Category.Travel, participants: [] }
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (values: GroupInfo) => {
    if (!session?.user.id) return

    const data = {
      name: values.name,
      description: values.description,
      category: values.category,
      participants: values.participants
    }

    if (group) {
      const { ok } = await updateGroup(data, group?.id ?? '')
      toast.success('Successfully updated!')

      setTimeout(() => {
        if (ok) {
          router.push('/')
        }
      }, 3000)
    } else {
      const { ok } = await createGroup(data)
      toast.success('Successfully created!')

      setTimeout(() => {
        if (ok) {
          router.push('/')
        }
      }, 3000)
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
      initialValues={group ?? initialValues}
      validateOnChange={false}
      validationSchema={validationSchemaNewBalance()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
    >
      {props => {
        const { values, errors, setFieldValue, handleSubmit, validateField } = props

        const addParticipant = (newParticipant: string) => {
          if (values.participants.length >= 50) return
          setFieldValue('participants', [
            ...values.participants,
            { name: newParticipant, id: generateID(), assignedCosts: [] }
          ])
        }

        const editParticipant = (newParticipant: ParticipantGroup) => {
          const tempParticipants = values.participants.map(participant =>
            participant.id === newParticipant.id ? newParticipant : participant
          )
          setFieldValue('participants', tempParticipants)
        }

        const removeParticipant = (participant: ParticipantGroup) => {
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
              {errors.name && <p className={styles.errorText}>name is required</p>}
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
              {errors.description}
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
                {values.participants.length + 1}/50{')'}
              </p>
              {/* TODO: Handle a loader for first participant */}
              <div className={`${styles.participantList}`}>
                {session?.user && !group && (
                  <div className="w-full flex justify-between gap-2 items-center animate__animated animate__fadeIn">
                    <p className="bg-transparent outline-none border-b-[1px] border-tertiary w-11/12 focus:text-secondary">
                      {session?.user.name} {'(yo)'}
                    </p>
                  </div>
                )}
                {values.participants.map(participant => (
                  <Participant
                    participant={participant}
                    editParticipant={editParticipant}
                    removeParticipant={removeParticipant}
                    key={participant.id}
                  />
                ))}
              </div>
              <ParticipantsForm addParticipant={addParticipant} />
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
