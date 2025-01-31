'use client'

import { Icon } from '@/components/ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { useFavoriteStore } from '@/providers/favorite-store-provider'

export function Controls({ productID }: { productID: string }) {
  const [{ inFavourites, add, remove }] = useFavoriteStore((state) => state)

  const isLiked = inFavourites(productID)

  const handleLikeClick = () => {
    if (isLiked) {
      remove(productID)
    } else {
      add(productID)
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
        <LikeButton width={21} height={21} liked={isLiked} onClick={handleLikeClick} />
        <span className="ml-1.5 font-medium select-none" onClick={handleLikeClick}>
          {isLiked ? 'Избранное' : 'В избранное'}
        </span>
      </div>
    </div>
  )
}
