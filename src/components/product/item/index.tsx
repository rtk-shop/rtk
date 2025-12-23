import Link from 'next/link'
import { toast } from 'sonner'
import { memo } from 'react'
import { cva } from 'cva'
import { Icon } from '@/components/ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { IconButton } from '@/components/ui/icon-button'
import { routeNames } from '@/lib/routes'
import { FormatPrice } from '@/components/ui/format-price'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { useAddProductToFavorite, useRemoveProductFromFavorites } from '@/lib/api/hooks'
import { ProductTag } from '@/lib/api/graphql/types'
import { TagBadge } from '../tag-badge'

export interface ProductItemProps {
  id: string
  title: string
  inStock: boolean
  currentPrice: number
  basePrice: number
  preview: string
  tag?: ProductTag | null
  withDelete?: boolean
}

const priceBlock = cva('basis-4/5 text-lg', {
  variants: {
    discount: {
      true: 'text-red-500',
      false: 'text-black'
    },
    inStock: {
      true: '',
      false: 'opacity-50'
    }
  }
})

const titleStyles = cva(
  'clear-both line-clamp-2 h-[34px] text-[13px] leading-4 font-semibold text-ellipsis whitespace-normal no-underline md:h-9 md:text-sm md:font-medium',
  {
    variants: {
      inStock: {
        true: 'text-black',
        false: 'text-gray-400'
      }
    }
  }
)

export const ProductItem = memo(function ProductItem(props: ProductItemProps) {
  return <ProductItemInner {...props} />
})

function ProductItemInner({
  id,
  preview,
  title,
  currentPrice,
  inStock,
  tag,
  basePrice,
  withDelete = false
}: ProductItemProps) {
  const [add] = useFavoriteStore((state) => state.add)
  const [remove] = useFavoriteStore((state) => state.remove)
  const [inFavourites] = useFavoriteStore((state) => state.inFavourites)

  const isFavourite = inFavourites(id)

  const [_, addFavorite] = useAddProductToFavorite()
  const [__, removeFavorite] = useRemoveProductFromFavorites()

  const handleActionClick = () => {
    if (isFavourite) {
      remove(id)
      removeFavorite({
        productId: id
      }).then((result) => {
        if (result.error) {
          add(id)

          toast.error('Не удалось убрать избранное', {
            duration: 2000,
            richColors: true
          })
        }
      })
    } else {
      add(id)
      addFavorite({
        productId: id
      }).then((result) => {
        if (result.error) {
          remove(id)

          toast.error('Не удалось добавить в избранное', {
            duration: 2000,
            richColors: true
          })
        }
      })
    }
  }

  return (
    <div className="relative mx-0.5 my-2">
      <div>
        <Link
          href={routeNames.product + id}
          className={`border-none focus:ring-0 ${!inStock ? 'opacity-50' : ''}`}
        >
          <ImagePlaceholder src={preview} alt={title} width={500} height={625} />
        </Link>
      </div>
      <div className="px-2 py-1 pt-0 md:px-3">
        <div className="flex h-12 items-center justify-between py-1">
          <div
            className={priceBlock({
              inStock,
              discount: currentPrice < basePrice
            })}
          >
            {currentPrice < basePrice && (
              <div className="text-[13px] leading-none text-gray-400 line-through">
                <FormatPrice size="inherit" price={basePrice} />
              </div>
            )}
            <div className="leading-none">
              <FormatPrice size="inherit" price={currentPrice} />
            </div>
          </div>
          <div>
            {withDelete ? (
              <IconButton onClick={handleActionClick} className="p-1! pb-1.5! text-red-600">
                <Icon name="action/trash" className="size-5" />
              </IconButton>
            ) : (
              <LikeButton liked={isFavourite} onClick={handleActionClick} />
            )}
          </div>
        </div>
        <Link href={routeNames.product + id} title={title} className={titleStyles({ inStock })}>
          {title}
        </Link>
      </div>
      {tag && (
        <div className="absolute top-2 right-2">
          <TagBadge tag={tag} currentPrice={currentPrice} basePrice={basePrice} />
        </div>
      )}
    </div>
  )
}
