import { Locales } from '@/config/locales'

export const getLocaleRoute = (currentPath: string, route: string) => {
  console.log(currentPath)
  if (currentPath.includes(Locales.ES)) {
    return `${Locales.ES}${route}`
  }
  return route
}
