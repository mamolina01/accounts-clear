import { AppLocaleConfig } from '@/config/locales'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const { usePathname, useRouter, Link, redirect } = createSharedPathnamesNavigation({
  locales: AppLocaleConfig.locales
})
