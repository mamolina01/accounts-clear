'use client'
import { Formik, Form } from 'formik'
import styles from './EnterGroupId.module.scss'
import { validationSchemaEnterGroupId } from '@/validations'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'
import { getGroupByIdToJoin } from '@/actions/groups/get-group-by-id'
import { UserIsAmongParticipants } from '@/actions/participants/user-is-among-participants'
import { useTranslations } from 'next-intl'

export const EnterGroupId = () => {
  const [error, setError] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('join.enterGroup')

  const handleSubmit = async (values: { id: string }) => {
    setIsLoading(true)
    const { group } = await getGroupByIdToJoin(values.id)

    if (!group) {
      setError(t('noExists'))
      setIsLoading(false)
      return
    }

    const isAmongParticipants = await UserIsAmongParticipants(values.id)

    if (isAmongParticipants) {
      setError(t('isAmongParticipants'))
      setIsLoading(false)
      return
    }

    setError('')
    router.push(`${Routes.JOIN}/${values.id}`)
  }
  return (
    <Formik
      initialValues={{ id: '' }}
      validateOnChange={true}
      validationSchema={validationSchemaEnterGroupId()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
      validateOnMount={false}
    >
      {props => {
        const { values, touched, errors, isValid, handleChange, handleSubmit } = props
        const idError = ((touched.id || values.id) && t(errors.id)) || ''

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e)
          if (error) {
            setError('')
          }
        }

        return (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="title" className={styles.label}>
                {t('label')} <span className={styles.required}>*</span>
              </label>
              <input
                id="title"
                name="id"
                type="text"
                value={values.id}
                placeholder={t('placeholder')}
                onChange={onChange}
                className={`${styles.input} ${error || idError ? styles.error : ''}`}
              />
              <p className={styles.errorText}>{error ? error : idError}</p>
            </div>

            <button type="submit" className={styles.submitButton} disabled={!isValid || isLoading || !!error}>
              {t('submit')}
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
