import { memo } from 'react'
import { cva } from 'cva'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@/components/ui/icon'
import { LikeButton } from '@/components/ui/like-button'
import { IconButton } from '@/components/ui/icon-button'
import { routeNames } from '@/lib/routes'
import { FormatPrice } from '@/components/ui/format-price'
import { ImagePlaceholder } from '@repo/ui'
import { getProductMainTagColor } from '@/lib/helpers'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import { useAddProductToFavorite, useRemoveProductFromFavorites } from '@/lib/api/hooks'
import { toast } from 'sonner'
import { ProductTag } from '@/lib/api/graphql/types'

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

const priceBlock = cva('basis-4/5 text-[18px] leading-5 text-black', {
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

  function genTagView(tag: ProductTag) {
    switch (tag) {
      case ProductTag.New:
        return <span>New</span>
      case ProductTag.Top:
        return <Image width={18} height={18} src="/icons/fire.png" alt="смайлик - огонь" />
      case ProductTag.Stock:
        return <span>-{Math.round(((basePrice - currentPrice) * 100) / basePrice)}%</span>
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
          <ImagePlaceholder src={preview} alt={title} width={500} height={625} />
        </Link>
      </div>
      <div className="px-2 py-1 pt-0 md:px-3">
        <div className="flex h-12 items-center justify-between py-1">
          <div
            className={priceBlock({
              discount: basePrice !== currentPrice,
              outStock: !inStock
            })}
          >
            {basePrice !== currentPrice && (
              <p className="text-[13px] text-gray-400 line-through">
                <FormatPrice price={basePrice} />
              </p>
            )}
            <span>
              <FormatPrice price={currentPrice} />
            </span>
          </div>
          <div>
            {withDelete ? (
              <IconButton
                onClick={handleActionClick}
                className="p-1! pb-1.5! text-[25px] text-gray-500!"
              >
                <Icon name="action/trash" className="text-[16px]" />
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
