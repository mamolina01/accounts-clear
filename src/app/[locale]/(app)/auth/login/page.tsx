import { FormContainer } from '@/components'
import { LoginForm } from '@/components/loginForm/LoginForm'
import { useTranslations } from 'next-intl'

const LoginPage = () => {
  const t = useTranslations('login')
  return (
    <FormContainer title={t('title')}>
      <LoginForm />
    </FormContainer>
  )
}

export default LoginPage
