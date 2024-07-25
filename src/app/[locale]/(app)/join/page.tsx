import { EnterGroupId, FormContainer } from '@/components'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import React from 'react'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Join a new group'
  }
}

const JoinPage = () => {
  const t = useTranslations('join.enterGroup')
  return (
    <FormContainer title={t('title')}>
      <EnterGroupId />
    </FormContainer>
  )
}

export default JoinPage
