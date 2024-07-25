import { FormContainer } from '@/components'
import { LoginForm } from '@/components/loginForm/LoginForm'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Login'
  }
}

const LoginPage = () => {
  const t = useTranslations('login')
  return (
    <FormContainer title={t('title')}>
      <LoginForm />
    </FormContainer>
  )
}

export default LoginPage
