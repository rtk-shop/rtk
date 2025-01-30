import Script from 'next/script'
import { type ReactNode } from 'react'
import { BotLayout } from '@/components/layout/bot-layout'
import { CartStoreProvider } from '@/providers/cart-store-provider'
import { FavoriteStoreProvider } from '@/providers/favorite-store-provider'
import { getFavoriteProducts } from '@/lib/api'

export default async function WebAppLayout({ children }: { children: ReactNode }) {
  const favorites = await getFavoriteProducts()

  return (
    <div>
      <Script strategy="beforeInteractive" src="https://telegram.org/js/telegram-web-app.js?56" />
      <FavoriteStoreProvider favoritesID={favorites}>
        <CartStoreProvider>
          <BotLayout>{children}</BotLayout>
        </CartStoreProvider>
      </FavoriteStoreProvider>
    </div>
  )
}
