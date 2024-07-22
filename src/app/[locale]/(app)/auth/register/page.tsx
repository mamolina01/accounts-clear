import { FormContainer } from '@/components'
import { RegisterForm } from '@/components/registerForm/RegisterForm'
import { useTranslations } from 'next-intl'

const NewAccountPage = () => {
  const t = useTranslations('register')
  return (
    <FormContainer title={t('title')}>
      <RegisterForm />
    </FormContainer>
  )
}

export default NewAccountPage
