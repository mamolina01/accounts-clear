'use client'
import { Locales } from '@/config/locales'
import { usePathname, useRouter } from '@/lib/i18nNavigation'
import { useParams } from 'next/navigation'

const useSwitchLanguage = () => {
  const router = useRouter()
  const path = usePathname()
  const { locale } = useParams()

  const switchLanguage = (newLocale: Locales) => {
    if (newLocale !== locale) {
      router.replace(path, { locale: newLocale })
    }
  }

  return switchLanguage
}

export default useSwitchLanguage
