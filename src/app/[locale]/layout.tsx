import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from '../Providers'
import { Footer } from '@/components'
import styles from './layout.module.scss'
import { Modals } from '@/components/modals'
import { auth } from '@/auth.config'
import { Header } from '@/components/shared/header/Header'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clear Accounts',
  description: 'Split your expenses with your friends!',
  icons: {
    icon: '/icon.png'
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={monserrat.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className={styles.container}>
              <Header session={session} />
              <div>{children}</div>
              <Footer />
              <Modals />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
