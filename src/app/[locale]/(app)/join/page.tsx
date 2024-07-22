import { EnterGroupId, FormContainer } from '@/components'
import { useTranslations } from 'next-intl'
import React from 'react'

const JoinPage = () => {
  const t = useTranslations('join.enterGroup')
  return (
    <FormContainer title={t('title')}>
      <EnterGroupId />
    </FormContainer>
  )
}

export default JoinPage
