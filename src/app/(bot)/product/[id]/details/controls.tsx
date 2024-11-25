'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { useFavoriteStore } from '@/providers/favorite-store-provider'

interface ControlsProps {
  productID: string
}

export function Controls({ productID }: ControlsProps) {
  const [{ products, add, remove }] = useFavoriteStore((state) => state)

  const isLiked = products.includes(productID)

  const handleLikeClick = (): void => {
    if (isLiked) {
      remove(productID)
    } else {
      add(productID)
    }
  }

  return (
    <div className="flex flex-wrap items-center">
      <div className="relative basis-1/2 after:absolute after:right-0.5 after:top-2.5 after:h-7 after:w-0.5 after:bg-gray-300">
        <Button
          fullWidth
          color="secondary"
          startIcon={<Icon name="action/share" className="mr-2.5 fill-black text-[21px]" />}
        >
          Поделиться
        </Button>
      </div>
      <div className="flex basis-1/2 items-center justify-center">
        <LikeButton width={21} height={21} liked={isLiked} onClick={handleLikeClick} />
        <span className="ml-1.5 select-none font-medium" onClick={handleLikeClick}>
          {isLiked ? 'Избранное' : 'В избранное'}
        </span>
      </div>
    </div>
  )
}
