import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { Providers } from './Providers'
import 'animate.css'
import { Footer, Header } from '@/components'
import styles from './layout.module.scss'
import { AuthRequired, ShareGroup } from '@/components/modals'

const monserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clear Accounts',
  description: 'Split your expenses with your friends!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <Providers>
          <div className={styles.container}>
            <Header />
            <div className={styles.subContainer}>{children}</div>
            <Footer />
            <ShareGroup />
            <AuthRequired />
          </div>
        </Providers>
      </body>
    </html>
  )
}
