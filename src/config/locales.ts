export enum Locales {
  EN = 'en',
  ES = 'es'
}

export const defaultLocale = Locales.EN

export const locales = [Locales.EN, Locales.ES]

const localePrefix: any = 'as-needed'

export const AppLocaleConfig = {
  locales,
  defaultLocale,
  localePrefix
}
