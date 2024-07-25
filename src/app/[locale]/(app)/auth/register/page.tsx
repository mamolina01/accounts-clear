import { FormContainer } from '@/components'
import { RegisterForm } from '@/components/registerForm/RegisterForm'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Register'
  }
}

const NewAccountPage = () => {
  const t = useTranslations('register')
  return (
    <FormContainer title={t('title')}>
      <RegisterForm />
    </FormContainer>
  )
}

export default NewAccountPage
