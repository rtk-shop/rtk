import { type ReactNode } from 'react'
import localFont from 'next/font/local'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { BotLayout } from '@/components/layout/bot-layout'
import { UrqlProvider } from '@/providers/urql'
import { CartStoreProvider } from '@/providers/cart-store-provider'
import { FavoriteStoreProvider } from '@/providers/favorite-store-provider'

import '@/styles/globals.scss'

const proximanova = localFont({
  display: 'optional',
  variable: '--font-proximanova',
  src: [
    {
      path: '../../../font/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../font/ProximaNova-Semibold.woff2',
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
            <FavoriteStoreProvider>
              <CartStoreProvider>
                <BotLayout>{children}</BotLayout>
              </CartStoreProvider>
            </FavoriteStoreProvider>
          </UrqlProvider>
        </NextIntlClientProvider>
        <div id="app-drawers" />
      </body>
    </html>
  )
}
