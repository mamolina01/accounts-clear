import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import 'animate.css'
import { Footer, Header } from '@/components'
import styles from './layout.module.scss'
import { Modals } from '@/components/modals'
import { auth } from '@/auth.config'

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clear Accounts',
  description: 'Split your expenses with your friends!'
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
          </div>
          <Modals />
        </Providers>
      </body>
    </html>
  )
}
