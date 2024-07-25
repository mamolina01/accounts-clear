'use client'

import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import { Form, Formik } from 'formik'
import { Link } from '@/lib/i18nNavigation'
import { FormEventHandler, useState } from 'react'
import styles from './LoginForm.module.scss'
import { validationSchemaLogin } from '@/validations'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import googleIcon from '@/public/images/google.png'
import { login } from '@/actions/auth/login'
import { useTranslations } from 'next-intl'
import { getLocaleRoute } from '@/helpers'
import { usePathname } from 'next/navigation'

export const LoginForm = () => {
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('login')
  const pathname = usePathname()

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

        window.location.replace(getLocaleRoute(pathname, tempUrl))
      } else {
        window.location.replace(getLocaleRoute(pathname, Routes.HOME))
      }
    }, 1500)
  }

  const handleGoogleLogin = async () => {
    if (redirectUrl) {
      const tempUrl = redirectUrl
      setRedirectUrl('')

      await signIn('google', { callbackUrl: tempUrl })
    } else {
      await signIn('google')
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
        const {
          values,
          isValid,
          touched,
          errors,
          handleBlur,
          handleSubmit,
          setFieldValue,
          validateForm,
          handleChange
        } = props

        const emailError = ((touched.email || values.email) && errors.email && t(`email.errors.${errors.email}`)) || ''
        const passwordError =
          ((touched.password || values.password) && errors.password && t(`password.errors.${errors.password}`)) || ''

        const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
          e.preventDefault()

          await setFieldValue('password', values.password.trim())
          await validateForm()
          handleSubmit()
        }

        return (
          <Form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={styles.label}>
                {t('email.label')}
              </label>
              <input
                name="email"
                type="text"
                value={values.email}
                placeholder={t('email.placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${emailError && styles.error}`}
              />
              <p className={styles.errorText}>{emailError}</p>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="description" className={styles.label}>
                {t('password.label')}
              </label>
              <input
                name="password"
                type="password"
                value={values.password}
                placeholder={t('password.placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${passwordError && styles.error}`}
              />
              <p className={styles.errorText}>{passwordError}</p>
            </div>

            <button type="submit" disabled={!isValid || isLoading} className={styles.submitButton}>
              {t('submit')}
            </button>

            <div className={styles.googleButton} onClick={handleGoogleLogin}>
              <Image src={googleIcon} alt="googleIcon" className={styles.icon} />
              <span className={styles.text}>{t('signInGoogle')}</span>
            </div>

            <span className={styles.bottomText}>
              {t('dontHaveAccount')}{' '}
              <Link href={Routes.REGISTER} className={styles.link}>
                {t('signUp')}
              </Link>
            </span>
          </Form>
        )
      }}
    </Formik>
  )
}
