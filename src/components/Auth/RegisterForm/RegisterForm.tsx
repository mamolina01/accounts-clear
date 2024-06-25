'use client'
import { registerUser } from '@/actions'
import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import styles from './RegisterForm.module.scss'
import { validationSchemaRegister } from '@/validations'
import toast from 'react-hot-toast'

interface FormProps {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [error, setError] = useState<string>('')
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true)
    const { name, email, password } = data
    const { ok, message } = await registerUser(name, email, password)

    if (!ok) {
      setError(message)
      setIsLoading(false)
      return
    }

    setError('')
    toast.success(message)
    setTimeout(() => {
      if (redirectUrl) {
        const tempUrl = redirectUrl
        setRedirectUrl('')

        window.location.replace(tempUrl)
      } else {
        window.location.replace(Routes.HOME)
      }
    }, 1500)
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validateOnChange
      validationSchema={validationSchemaRegister()}
      onSubmit={values => {
        onSubmit({ ...values })
      }}
    >
      {props => {
        const { values, isValid, touched, errors, handleBlur, handleSubmit, handleChange } = props
        const nameError = ((touched.name || values.name) && errors.name) || ''
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
                Name
              </label>
              <input
                name="name"
                type="text"
                value={values.name}
                placeholder="Enter a name"
                onChange={onChange}
                onBlur={handleBlur}
                className={`${styles.input} ${nameError && styles.error}`}
              />
              <p className={styles.errorText}>{nameError}</p>
            </div>
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
              Do you already have your account?{' '}
              <Link href={Routes.LOGIN} className={styles.link}>
                Sign in!
              </Link>
            </span>
          </Form>
        )
      }}
    </Formik>
  )
}
