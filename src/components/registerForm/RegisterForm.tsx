'use client'
import { Routes } from '@/enums/routes'
import { useGeneralBehaviourStore } from '@/store'
import { Form, Formik } from 'formik'
import { Link } from '@/lib/i18nNavigation'
import { useState } from 'react'
import styles from './RegisterForm.module.scss'
import { validationSchemaRegister } from '@/validations'
import toast from 'react-hot-toast'
import { registerUser } from '@/actions/auth/register'
import { useTranslations } from 'next-intl'

interface FormProps {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { redirectUrl, setRedirectUrl } = useGeneralBehaviourStore(state => state)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('register')
  const onSubmit = async (data: FormProps) => {
    setIsLoading(true)
    const { name, email, password } = data
    const { ok, message } = await registerUser(name, email, password)

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
      initialValues={{ name: '', email: '', password: '' }}
      validateOnChange
      validationSchema={validationSchemaRegister()}
      onSubmit={values => {
        onSubmit({ ...values })
      }}
    >
      {props => {
        const { values, isValid, touched, errors, handleBlur, handleSubmit, handleChange } = props
        const nameError = ((touched.name || values.name) && t(`name.errors.${errors.name}`)) || ''
        const emailError = ((touched.email || values.email) && t(`email.errors.${errors.email}`)) || ''
        const passwordError = ((touched.password || values.password) && t(`password.errors.${errors.password}`)) || ''

        return (
          <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={styles.label}>
                {t('name.label')}
              </label>
              <input
                name="name"
                type="text"
                value={values.name}
                placeholder={t('name.placeholder')}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${nameError && styles.error}`}
              />
              <p className={styles.errorText}>{nameError}</p>
            </div>
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

            <span className={styles.bottomText}>
              {t('alreadyHaveAccount')}{' '}
              <Link href={Routes.LOGIN} className={styles.link}>
                {t('signIn')}
              </Link>
            </span>
          </Form>
        )
      }}
    </Formik>
  )
}
