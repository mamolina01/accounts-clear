import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import 'animate.css'
import { Footer } from '@/components'
import styles from './layout.module.scss'
import { Modals } from '@/components/modals'
import { auth } from '@/auth.config'
import { Header } from '@/components/shared/header/Header'

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

  return (
    <html lang="en">
      <body className={monserrat.className}>
        <Providers>
          <div className={styles.container}>
            <Header session={session} />
            <div>{children}</div>
            <Footer />
            <Modals />
          </div>
        </Providers>
      </body>
    </html>
  )
}
