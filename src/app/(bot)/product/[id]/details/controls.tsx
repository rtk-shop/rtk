import { Icon } from '@/components/ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { useAddProductToFavorite, useRemoveProductFromFavorites } from '@/lib/api/hooks'
import { toast } from 'sonner'

export function Controls({ productId }: { productId: string }) {
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

          toast.error('Не удалось убрать избранное', {
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

          toast.error('Не удалось добавить в избранное', {
            duration: 2000,
            richColors: true
          })
        }
      })
    }
  }

  return (
    <div className="flex flex-wrap items-center">
      <div className="relative basis-1/2 before:absolute before:-top-0.5 before:right-0.5 before:h-7 before:w-0.5 before:bg-gray-300">
        <div className="flex justify-center">
          <Icon name="action/share" className="mr-2.5 fill-black text-[21px]" />
          <span className="font-medium">Поделиться</span>
        </div>
      </div>
      <div className="flex basis-1/2 items-center justify-center">
        <LikeButton width={21} height={21} liked={isFavourite} onClick={handleLikeClick} />
        <span className="ml-1.5 font-medium select-none" onClick={handleLikeClick}>
          {isFavourite ? 'Избранное' : 'В избранное'}
        </span>
      </div>
    </div>
  )
}
