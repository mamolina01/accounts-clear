'use client'
import { Formik, Form } from 'formik'
import styles from './EnterGroupId.module.scss'
import { validationSchemaEnterGroupId } from '@/validations'
import { getGroupByIdToJoin } from '@/actions'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Routes } from '@/enums/routes'

export const EnterGroupId = () => {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (values: { id: string }) => {
    const { group } = await getGroupByIdToJoin(values.id)

    console.log(!group)
    if (!group) {
      setError(`Doesn't exists a group with this id`)
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
        const { values, touched, errors, handleChange, handleSubmit } = props
        const idError = ((touched.id || values.id) && errors.id) || ''

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
                Group id
              </label>
              <input
                name="id"
                type="text"
                value={values.id}
                placeholder="Enter group id"
                onChange={onChange}
                className={`${styles.input} ${error || idError ? styles.error : ''}`}
              />
              <p className={styles.errorText}>{error ? error : idError}</p>
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
