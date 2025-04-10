import { type ReactNode } from 'react'
import { BotLayout } from '@/components/layout/bot-layout'
import { FavoriteStoreProvider } from '@/providers/favorite-store-provider'
import { getFavouriteProductsId } from '@/lib/api'

export default async function WebAppLayout({ children }: { children: ReactNode }) {
  const favorites = await getFavouriteProductsId()

  return (
    <div>
      <FavoriteStoreProvider favoritesID={favorites}>
        <BotLayout>{children}</BotLayout>
      </FavoriteStoreProvider>
    </div>
  )
}
