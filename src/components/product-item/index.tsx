import { memo, type ReactElement } from 'react'
import { cva } from 'cva'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '../ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { IconButton } from '@/components/ui/icon-button'
import { routeNames } from '@/lib/constants'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { formatPrice, getProductMainTagColor } from '@/lib/helpers'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import type { ProductTag } from '@/types'
import { useAddProductToFavorite, useRemoveProductFromFavorites } from '@/lib/api/hooks'

interface ProductItemProps {
  id: string
  url: string
  title: string
  price: number
  inStock: boolean
  basePrice: number
  tag?: keyof typeof ProductTag | null
  withDelete?: boolean
}

const priceBlock = cva('basis-4/5 text-[18px] leading-5 font-semibold text-black', {
  variants: {
    discount: {
      true: 'text-red-600'
    },
    outStock: {
      true: 'opacity-50'
    }
  }
})

export const ProductItem = memo(function ProductItem(props: ProductItemProps) {
  return <ProductItemInner {...props} />
})

function ProductItemInner({
  id,
  url,
  title,
  price,
  inStock,
  tag,
  basePrice,
  withDelete = false
}: ProductItemProps) {
  const [add] = useFavoriteStore((state) => state.add)
  const [remove] = useFavoriteStore((state) => state.remove)
  const [inFavourites] = useFavoriteStore((state) => state.inFavourites)

  const isFavourite = inFavourites(id)

  const [addResult, addFavorite] = useAddProductToFavorite()
  const [removeResult, removeFavorite] = useRemoveProductFromFavorites()

  const handleActionClick = () => {
    if (isFavourite) {
      remove(id)
      removeFavorite({
        productId: id
      })
    } else {
      add(id)
      addFavorite({
        productId: id
      })
    }
  }

  function genTagView(productTag: string): ReactElement | null {
    switch (productTag) {
      case 'new':
        return <span>New</span>
      case 'top':
        return <Image width={18} height={18} src="/icons/fire.png" alt="смайлик - огонь" />
      case 'stock':
        return <span>-{Math.round(((basePrice - price) * 100) / basePrice)}%</span>
      default:
        return null
    }
  }

  return (
    <div className="relative mx-0.5 my-2">
      <div>
        <Link
          href={routeNames.product + id}
          className={`border-none focus:ring-0 ${!inStock ? 'opacity-50' : ''}`}
        >
          <ImagePlaceholder src={url} altText={title} width={500} height={625} />
        </Link>
      </div>
      <div className="px-2 py-1 pt-0 md:px-3">
        <div className="flex h-12 items-center justify-between py-1">
          <div
            className={priceBlock({
              discount: basePrice !== price,
              outStock: !inStock
            })}
          >
            {basePrice !== price && (
              <p className="text-[13px] font-medium text-gray-400 line-through">
                {formatPrice(basePrice)} <span>₴</span>
              </p>
            )}
            <span>
              {formatPrice(price)} <span className="font-normal">₴</span>
            </span>
          </div>
          <div>
            {withDelete ? (
              <IconButton onClick={handleActionClick} className="p-1.5">
                <Icon name="action/trash" className="text-[22px]" />
              </IconButton>
            ) : (
              <LikeButton liked={isFavourite} onClick={handleActionClick} />
            )}
          </div>
        </div>
        <Link
          href={routeNames.product + id}
          title={title}
          className="clear-both line-clamp-2 h-[34px] text-[13px] leading-4 font-semibold text-ellipsis whitespace-normal text-black no-underline md:h-9 md:text-sm md:font-medium"
        >
          {title}
        </Link>
      </div>
      {tag && (
        <div
          className="font-semibolds absolute top-2 right-2 flex w-10 items-center justify-center rounded-md p-1 text-center text-xs text-white select-none"
          style={{
            backgroundColor: getProductMainTagColor(tag)
          }}
        >
          {genTagView(tag)}
        </div>
      )}
    </div>
  )
}
