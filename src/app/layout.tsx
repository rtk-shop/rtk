import { type ReactNode } from 'react'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { UrqlProvider } from '@/providers/urql'

import '@/styles/globals.css'

const proximanova = localFont({
  display: 'optional',
  variable: '--font-proximanova',
  src: [
    {
      path: '../../font/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../font/ProximaNova-Semibold.woff2',
      weight: '500',
      style: 'normal'
    }
  ]
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={proximanova.variable}>
        <NextIntlClientProvider messages={messages}>
          <UrqlProvider>
            <main>{children}</main>
            <Toaster position="bottom-center" richColors expand />
          </UrqlProvider>
        </NextIntlClientProvider>
        <div id="app-drawers" />
      </body>
    </html>
  )
}
