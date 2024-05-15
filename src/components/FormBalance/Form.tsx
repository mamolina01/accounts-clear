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
import styles from './Form.module.scss'

export const Form = () => {
  const initialValues: newBalanceProps = { title: '', description: '', participants: [] }
  const { data: session } = useSession()
  const router = useRouter()
  const handleSubmit = async (values: newBalanceProps) => {
    if (!session?.user.id) return

    const data = {
      name: values.title,
      description: values.description,
      category: Category.travel,
      id: session?.user.id
    }
    const { ok } = await createGroup(data)

    if (ok) {
      router.push('/')
    }
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Nuevo balance de gastos</h5>
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
            const tempParticipants = values.participants.filter(
              tempParticipant => tempParticipant.id !== participant.id
            )
            setFieldValue('participants', tempParticipants)
          }

          const onSubmit: FormEventHandler<HTMLFormElement> = e => {
            e.preventDefault()
            if (values.participants.length === 0) {
              setFieldValue('participants', [...values.participants, { name: 'Matias (yo)', id: generateID() }])
              validateField('participants')
            }
            handleSubmit()
          }

          return (
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <label htmlFor="title" className={styles.label}>
                  Titulo
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  placeholder="Ingrese un titulo"
                  onChange={e => setFieldValue('title', e.target.value)}
                  className={`${styles.input} ${errors.title && styles.error}`}
                />
                {errors.title && <p className={styles.errorText}>El titulo es requerido</p>}
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="description" className={styles.label}>
                  Descripcion
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={values.description}
                  placeholder="Ingrese una descripción"
                  onChange={e => setFieldValue('description', e.target.value)}
                  className={`${styles.input} ${errors.description && styles.error}`}
                />
                {errors.description}
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.label}>
                  Participantes {'('}
                  {values.participants.length}/50{')'}
                </p>
                <div className={styles.participantList}>
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
                Crear balance
              </button>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}
