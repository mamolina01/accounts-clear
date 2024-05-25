'use client'
import { createGroup } from '@/actions'
import { FormParticipants } from '@/components/FormBalance/FormParticipants'
import { Participant } from '@/components/FormBalance/Participant'
import { generateID } from '@/helpers'
import { ParticipantProps, newBalanceProps } from '@/types/newBalance'
import { validationSchemaNewBalance } from '@/validations'
import { Category } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FormEventHandler } from 'react'
import styles from './FormBalance.module.scss'

export const FormBalance = () => {
  const initialValues: newBalanceProps = { title: '', description: '', category: Category.Travel, participants: [] }
  const { data: session } = useSession()
  const router = useRouter()
  const handleSubmit = async (values: newBalanceProps) => {
    if (!session?.user.id) return

    const participantNames = values.participants.map(participant => {
      const { name } = participant
      return name
    })

    const data = {
      name: values.title,
      description: values.description,
      category: values.category,
      participants: participantNames
    }
    const { ok } = await createGroup(data)

    if (ok) {
      router.push('/')
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
      initialValues={initialValues}
      validateOnChange
      validationSchema={validationSchemaNewBalance()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
      validateOnMount={false}
    >
      {props => {
        const { values, errors, setFieldValue, handleSubmit, validateField } = props

        const addParticipant = (newParticipant: string) => {
          if (values.participants.length >= 50) return
          setFieldValue('participants', [...values.participants, { name: newParticipant, id: generateID() }])
        }

        const editParticipant = (newParticipant: ParticipantProps) => {
          const tempParticipants = values.participants.map(participant =>
            participant.id === newParticipant.id ? newParticipant : participant
          )
          setFieldValue('participants', tempParticipants)
        }

        const removeParticipant = (participant: ParticipantProps) => {
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
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.label}>
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                placeholder="Enter a title"
                onChange={e => setFieldValue('title', e.target.value)}
                className={`${styles.input} ${errors.title && styles.error}`}
              />
              {errors.title && <p className={styles.errorText}>Title is required</p>}
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
              <div className={styles.participantList}>
                {session?.user && (
                  <div className="w-full flex justify-between gap-2 items-center">
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
              <FormParticipants addParticipant={addParticipant} />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create Balance
            </button>
          </form>
        )
      }}
    </Formik>
  )
}
