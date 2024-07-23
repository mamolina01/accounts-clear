'use client'
import { Routes } from '@/enums/routes'
import { useRouter } from '@/lib/i18nNavigation'

const NotFoundPage = () => {
  const router = useRouter()
  router.push(Routes.HOME)

  return <></>
}

export default NotFoundPage
