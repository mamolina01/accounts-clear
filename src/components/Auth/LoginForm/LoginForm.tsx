'use client'

import { login } from '@/actions'
import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import styles from './LoginForm.module.scss'
import { validationSchemaLogin } from '@/validations'

export const LoginForm = () => {
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values
    setIsLoading(true)
    const { ok, message } = await login(email, password)

    if (ok) {
      const tempUrl = redirectUrl
      setRedirectUrl('')
      window.location.replace(tempUrl)
    } else {
      setError(message)
      setIsLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnChange
      validationSchema={validationSchemaLogin()}
      onSubmit={values => {
        handleSubmit({ ...values })
      }}
    >
      {props => {
        const { values, isValid, touched, errors, handleBlur, handleSubmit, handleChange } = props

        const emailError = ((touched.email || values.email) && errors.email) || ''
        const passwordError = ((touched.password || values.password) && errors.password) || ''

        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          handleChange(e)
          if (error) {
            setError('')
          }
        }

        return (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={styles.label}>
                Email
              </label>
              <input
                name="email"
                type="text"
                value={values.email}
                placeholder="Enter an email"
                onChange={onChange}
                onBlur={handleBlur}
                className={`${styles.input} ${emailError && styles.error}`}
              />
              <p className={styles.errorText}>{emailError}</p>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.label}>
                Password
              </label>
              <input
                name="password"
                type="password"
                value={values.password}
                placeholder="Enter a password"
                onChange={onChange}
                onBlur={handleBlur}
                className={`${styles.input} ${passwordError && styles.error}`}
              />
              <p className={styles.errorText}>{passwordError}</p>
            </div>

            <span className={`${styles.errorText} ${styles.apiError}`}>{error}</span>

            <button type="submit" disabled={!isValid || isLoading || !!error} className={styles.submitButton}>
              Submit
            </button>

            <span className={styles.bottomText}>
              Still don't have your account?{' '}
              <Link href={Routes.REGISTER} className={styles.link}>
                Sign up!
              </Link>
            </span>
          </Form>
        )
      }}
    </Formik>
  )
}
