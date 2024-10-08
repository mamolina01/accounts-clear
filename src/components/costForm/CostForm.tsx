'use client'
import { Form, Formik } from 'formik'
import styles from './CostForm.module.scss'
import { validationSchemaNewCost } from '@/validations'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { CostProps, CostPropsTemp, Participant, ParticipantSelectable } from '@/types/cost'
import { useRouter } from '@/lib/i18nNavigation'
import toast from 'react-hot-toast'
import { Routes } from '@/enums/routes'
import { FormEvent, useState } from 'react'
import { FormContainer, InputNumber } from '..'
import { updateCost } from '@/actions/costs/update-cost'
import { createCost } from '@/actions/costs/create-cost'
import { useTranslations } from 'next-intl'

interface Props {
  cost: CostPropsTemp
  groupId: string
}

export const CostForm = ({ cost, groupId }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('costForm')

  const handleSubmit = async (values: CostPropsTemp) => {
    setIsLoading(true)
    const formattedUsers = values.assignedUsers.filter(user => {
      if (user.selected) {
        return {
          id: user.id,
          name: user.name
        }
      }
    })

    const data: CostProps = {
      title: values.title,
      amount: values.amount,
      paidBy: values.paidBy,
      assignedUsers: formattedUsers
    }

    if (cost.id) {
      const { ok } = await updateCost(data, cost.id, groupId)
      if (ok) {
        toast.success(t('successfullyUpdated'))
        setTimeout(() => {
          router.push(`${Routes.GROUPS}/${groupId}`)
        }, 1500)
      } else {
        toast.error('Something went wrong!')
      }
      return
    }

    const { ok } = await createCost(data, groupId)
    if (ok) {
      toast.success(t('successfullyAdded'))
      setTimeout(() => {
        router.push(`${Routes.GROUPS}/${groupId}`)
      }, 1500)
    } else {
      toast.error(t('somethingWrong'))
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }
  const title = cost?.id ? t('editCost') : t('addNewCost')

  return (
    <FormContainer title={title}>
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
          const { values, touched, errors, isValid, setFieldValue, handleSubmit, handleBlur, validateForm } = props
          const titleError =
            ((touched.title || values.title) && errors.title && t(`title.errors.${errors.title}`)) || ''
          const amountError =
            ((touched.amount || values.amount) && errors.amount && t(`amount.errors.${errors.amount}`)) || ''
          const paidByError =
            ((touched.paidBy || values.paidBy) && errors.paidBy && t(`paidBy.errors.${errors.paidBy}`)) || ''
          const assignedUsersError =
            ((touched.assignedUsers || values.assignedUsers) &&
              (errors.assignedUsers as string) &&
              t(`participants.errors.${errors.assignedUsers}`)) ||
            ''

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

          const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            await setFieldValue('title', values.title.trim())
            await validateForm()
            handleSubmit()
          }

          return (
            <Form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <label htmlFor="title" className={styles.label}>
                  {t('title.label')} <span className={styles.required}>*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={values.title}
                  placeholder={t('title.placeholder')}
                  onChange={e => setFieldValue('title', e.target.value)}
                  onBlur={handleBlur}
                  className={`${styles.input} ${titleError ? styles.error : ''}`}
                />
                <p className={styles.errorText}>{titleError}</p>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="amount" className={styles.label}>
                  {t('amount.label')} <span className={styles.required}>*</span>
                </label>
                <div className={styles.amountContainer}>
                  <InputNumber
                    id="amount"
                    name="amount"
                    type="text"
                    value={values.amount}
                    onChange={e => setFieldValue('amount', e.target.value)}
                    placeholder={t('amount.placeholder')}
                    onBlur={handleBlur}
                    className={`${styles.input} ${amountError ? styles.error : ''}`}
                  />
                  <span>ARS</span>
                </div>
                <p className={styles.errorText}>{amountError}</p>
              </div>

              <div className={styles.inputContainer}>
                <label htmlFor="paidBy" className={styles.label}>
                  {t('paidBy.label')} <span className={styles.required}>*</span>
                </label>

                <select
                  className={`${styles.select} ${paidByError ? styles.error : ''}`}
                  id="paidBy"
                  defaultValue={cost.paidBy ? cost.paidBy : 'selectOne'}
                  onChange={e => handlePaidBy(e.target.value)}
                  onBlur={handleBlur}
                >
                  <option value="selectOne" disabled>
                    -- {t('paidBy.placeholder')} --
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
                  {t('participants.label')} <span className={styles.required}>*</span>
                </label>
                <div className={`${styles.participantList} ${assignedUsersError ? styles.error : ''}`}>
                  {cost.assignedUsers.map(participant => (
                    <div key={participant.id} className={styles.participantContainer}>
                      {participant.selected ? (
                        <ImCheckboxChecked
                          className={`${styles.icon} ${styles.selected}`}
                          onClick={() => handleParticipants(participant)}
                        />
                      ) : (
                        <ImCheckboxUnchecked className={styles.icon} onClick={() => handleParticipants(participant)} />
                      )}
                      <span className={styles.name}>{participant.name}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.errorText}>{assignedUsersError}</p>
              </div>

              <button type="submit" className={styles.submitButton} disabled={!isValid || isLoading}>
                {t(cost?.id ? 'editCost' : 'addNewCost')}
              </button>
            </Form>
          )
        }}
      </Formik>
    </FormContainer>
  )
}
