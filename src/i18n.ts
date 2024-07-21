import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { Locales, locales } from './config/locales'

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locales)) notFound()

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  }
})
