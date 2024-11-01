'use client'

import ShareIcon from '../../../../../../public/icons/share.svg'
import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import { LikeButton } from '@/components/ui/like-button'
import { useFavoriteStore } from '@/providers/favorite-store-provider'

interface ControlsProps {
  productID: string
}

export function Controls({ productID }: ControlsProps) {
  const { products, add, remove } = useFavoriteStore((state) => state)

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
      <div className="basis-1/2">
        <Button
          fullWidth
          color="secondary"
          startIcon={
            <SvgIcon className="mr-2.5 fill-black text-[21px]">
              <ShareIcon />
            </SvgIcon>
          }
        >
          Поделиться
        </Button>
      </div>
      <div className="flex basis-1/2 items-center">
        <LikeButton width={21} height={21} liked={isLiked} onClick={handleLikeClick} />
        <span className="ml-1.5 select-none font-medium" onClick={handleLikeClick}>
          {isLiked ? 'Избранное' : 'В избранное'}
        </span>
      </div>
    </div>
  )
}