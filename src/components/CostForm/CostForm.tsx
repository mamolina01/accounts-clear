'use client'
import { Form, Formik } from 'formik'
import styles from './CostForm.module.scss'
import { validationSchemaNewCost } from '@/validations'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { createCost } from '@/actions'
import { CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { useRouter } from 'next/navigation'

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

    const data = {
      id: cost.id,
      title: values.title,
      amount: values.amount,
      paidBy: values.paidBy,
      assignedUsers: formattedUsers
    }

    console.log(data)
    if (cost.id) {
      console.log('update data')
    }

    const { ok } = await createCost(data, groupId)
    if (ok) {
      router.push('/')
    }
  }

  return (
    <Formik
      initialValues={cost}
      validateOnChange={false}
      validationSchema={validationSchemaNewCost()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
      validateOnMount={false}
    >
      {props => {
        const { values, errors, setFieldValue, handleSubmit } = props

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
          const { selected, ...participant } = paidBy
          setFieldValue('paidBy', participant)
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
              <p className={styles.errorText}>{errors.title}</p>
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
              <p className={styles.errorText}>{errors.amount}</p>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="paidBy" className={styles.label}>
                Paid by
              </label>

              <select
                className={`${styles.select} ${errors.paidBy ? styles.error : ''}`}
                id="paidBy"
                defaultValue={values.paidBy.id ?? 'selectOne'}
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
              <p className={styles.errorText}>{errors.paidBy?.id}</p>
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
              {/* TODO: Check participants error */}
              {/* <p className={styles.errorText}>{errors.participants}</p> */}
            </div>

            <button type="submit" className={styles.submitButton}>
              Create Cost
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
