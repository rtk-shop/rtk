'use client'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { toast } from 'sonner'
import { LikeButton } from '@/components/ui/like-button'
import { useTranslations } from 'next-intl'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { useAddProductToFavorite, useRemoveProductFromFavorites } from '@/lib/api/hooks'

export function SubControls({ productId }: { productId: string }) {
  const t = useTranslations('Product')
  const [favoriteStore] = useFavoriteStore((state) => state)
  const [_, addFavorite] = useAddProductToFavorite()
  const [__, removeFavorite] = useRemoveProductFromFavorites()

  const isFavourite = favoriteStore.inFavourites(productId)

  const handleLikeClick = () => {
    if (isFavourite) {
      favoriteStore.remove(productId)
      removeFavorite({ productId }).then((result) => {
        if (result.error) {
          favoriteStore.add(productId)
          toast.error(t('toasts.delFavourite'), {
            duration: 2000,
            richColors: true
          })
        }
      })
    } else {
      favoriteStore.add(productId)
      addFavorite({ productId }).then((result) => {
        if (result.error) {
          favoriteStore.remove(productId)

          toast.error(t('toasts.addFavourite'), {
            duration: 2000,
            richColors: true
          })
        }
      })
    }
  }

  return (
    <Box flex="row" align="center" className="text-sm">
      <Box
        flex="row"
        align="center"
        justify="center"
        className="relative basis-1/2 before:absolute before:-top-0.5 before:right-0.5 before:h-7 before:w-0.5 before:bg-gray-300"
      >
        <Icon name="action/share" className="mr-2 fill-black text-[21px]" />
        <p className="font-medium">{t('share')}</p>
      </Box>
      <Box flex="row" align="center" justify="center" className="basis-1/2">
        <LikeButton width={21} height={21} liked={isFavourite} onClick={handleLikeClick} />
        <p className="ml-1 leading-none font-medium select-none" onClick={handleLikeClick}>
          {isFavourite ? t('favourite') : t('toFavourite')}
        </p>
      </Box>
    </Box>
  )
}
