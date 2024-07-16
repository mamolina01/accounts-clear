import { AppLocaleConfig } from '@/config/locales'
import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const { usePathname, useRouter, Link } = createSharedPathnamesNavigation({
  locales: AppLocaleConfig.locales
})
