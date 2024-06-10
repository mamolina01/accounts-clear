'use client'
import { Form, Formik } from 'formik'
import styles from './CostForm.module.scss'
import { validationSchemaNewCost } from '@/validations'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { createCost } from '@/actions'
import { CostProps, CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { useRouter } from 'next/navigation'
import { updateCost } from '@/actions'
import toast from 'react-hot-toast'

interface Props {
  cost: CostPropsTemp
  groupId: string
}

export const CostForm = ({ cost, groupId }: Props) => {
  const router = useRouter()

  const handleSubmit = async (values: CostPropsTemp) => {
    const formattedUsers = values.assignedUsers.map(user => {
      return {
        id: user.id,
        name: user.name
      }
    })

    const data: CostProps = {
      title: values.title,
      amount: values.amount,
      paidBy: values.paidBy,
      assignedUsers: formattedUsers
    }

    if (cost.id) {
      const { ok } = await updateCost(data, cost.id)
      if (ok) {
        toast.success('Successfully updated!')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
      return
    }

    const { ok } = await createCost(data, groupId)
    if (ok) {
      toast.success('Successfully added!')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
  }

  return (
    <Formik
      initialValues={cost}
      validateOnChange={true}
      validationSchema={validationSchemaNewCost()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
      validateOnMount={false}
    >
      {props => {
        const { values, touched, errors, setFieldValue, handleSubmit } = props
        const titleError = ((touched.title || values.title) && errors.title) || ''
        const amountError = ((touched.amount || values.amount) && errors.amount) || ''
        const paidByError = ((touched.paidBy || values.paidBy) && errors.paidBy) || ''
        const assignedUsersError =
          ((touched.assignedUsers || values.assignedUsers) && (errors.assignedUsers as string)) || ''

        const handleParticipants = (participant: Participant) => {
          const tempParticipants = cost.assignedUsers.map(participantItem => {
            if (participantItem.id === participant.id) {
              participantItem.selected = !participantItem.selected
            }
            return participantItem
          })
          const selectedParticipants = tempParticipants.filter(
            (participant: ParticipantSelectable) => participant.selected
          )
          setFieldValue('assignedUsers', selectedParticipants)
        }

        const handlePaidBy = (id: string) => {
          const paidBy = cost.assignedUsers.find((participant: ParticipantSelectable) => participant.id === id)
          if (!paidBy) return
          setFieldValue('paidBy', id)
        }

        return (
          <Form onSubmit={handleSubmit} className={styles.form}>
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
                className={`${styles.input} ${errors.title ? styles.error : ''}`}
              />
              <p className={styles.errorText}>{titleError}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="amount" className={styles.label}>
                Amount
              </label>
              <div className={styles.amountContainer}>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  value={values.amount}
                  placeholder="Enter an amount"
                  onChange={e => setFieldValue('amount', e.target.value)}
                  className={`${styles.input} ${errors.amount ? styles.error : ''}`}
                />
                <span>ARS</span>
              </div>
              <p className={styles.errorText}>{amountError}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="paidBy" className={styles.label}>
                Paid by
              </label>

              <select
                className={`${styles.select} ${errors.paidBy ? styles.error : ''}`}
                id="paidBy"
                defaultValue={cost.paidBy ? cost.paidBy : 'selectOne'}
                onChange={e => handlePaidBy(e.target.value)}
              >
                <option value="selectOne" disabled>
                  -- Select one --
                </option>
                {cost.assignedUsers.map((participant, index) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name}
                  </option>
                ))}
              </select>
              <p className={styles.errorText}>{paidByError}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="participants" className={styles.label}>
                Participants
              </label>
              <div className={`${styles.participantList} ${errors.assignedUsers ? styles.error : ''}`}>
                {cost.assignedUsers.map(participant => (
                  <div key={participant.id} className={styles.participantContainer}>
                    {participant.selected ? (
                      <ImCheckboxChecked
                        className="text-sm text-primary"
                        onClick={() => handleParticipants(participant)}
                      />
                    ) : (
                      <ImCheckboxUnchecked className="text-sm" onClick={() => handleParticipants(participant)} />
                    )}
                    <span>{participant.name}</span>
                  </div>
                ))}
              </div>
              <p className={styles.errorText}>{assignedUsersError}</p>
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
