'use client'

import { login } from '@/actions'
import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useState } from 'react'
import styles from './LoginForm.module.scss'
import { validationSchemaLogin } from '@/validations'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import googleIcon from '@/public/images/google.png'

export const LoginForm = () => {
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values
    setIsLoading(true)
    const { ok, message } = await login(email, password)

    if (!ok) {
      toast.error(message)
      setIsLoading(false)
      return
    }

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
                onChange={handleChange}
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
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${passwordError && styles.error}`}
              />
              <p className={styles.errorText}>{passwordError}</p>
            </div>

            <div className={styles.googleButton} onClick={() => signIn('google')}>
              <Image src={googleIcon} alt="googleIcon" className={styles.icon} />
              <span className={styles.text}>Sign in with Google</span>
            </div>

            <button type="submit" disabled={!isValid || isLoading} className={styles.submitButton}>
              Submit
            </button>

            <span className={styles.bottomText}>
              Still don{"'"}t have your account?{' '}
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
