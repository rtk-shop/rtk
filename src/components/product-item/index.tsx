import Link from 'next/link'
import Image from 'next/image'
import { type ReactElement } from 'react'
import { cva } from 'cva'
import { SvgIcon } from '../ui/svg-icon'
import { LikeButton } from '@/components/ui/like-button'
import { IconButton } from '@/components/ui/icon-button'
import { routeNames } from '@/lib/constants'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { formatPrice, getProductMainTagColor } from '@/lib/helpers'
import { useFavoriteStore } from '@/providers/favorite-store-provider'
import type { ProductTag } from '@/types'
import TrashIcon from '../../../public/icons/trash.svg'

interface ProductItemProps {
  id: string
  slug: string
  url: string
  title: string
  price: number
  inStock: boolean
  basePrice: number
  tag?: keyof typeof ProductTag | null
  isFavorite: boolean
  withDelete?: boolean
}

const priceBlock = cva('basis-4/5 text-[18px] font-semibold leading-5 text-black', {
  variants: {
    discount: {
      true: 'text-red-600'
    },
    outStock: {
      true: 'opacity-50'
    }
  }
})

export function ProductItem({
  id,
  slug,
  url,
  title,
  price,
  inStock,
  tag,
  basePrice,
  isFavorite,
  withDelete = false
}: ProductItemProps) {
  const [{ add, remove }] = useFavoriteStore((state) => state)

  const handleActionClick = () => {
    if (isFavorite) {
      remove(id)
    } else {
      add(id)
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
    <div className="relative mx-0.5 my-2 md:mx-1">
      <div>
        <Link
          href={routeNames.product + id}
          className={`border-none focus:ring-0 ${!inStock ? 'opacity-50' : ''}`}
        >
          <ImagePlaceholder src={url} altText={title} />
        </Link>
      </div>
      <div className="px-2 py-1 pt-0 md:px-3">
        <div className="flex items-center justify-between py-1">
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
          <div className="">
            {withDelete ? (
              <IconButton onClick={handleActionClick}>
                <SvgIcon className="fill-gray-500">
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            ) : (
              <LikeButton liked={isFavorite} onClick={handleActionClick} />
            )}
          </div>
        </div>
        <Link
          href={routeNames.product + id}
          title={title}
          className="clear-both line-clamp-2 h-[34px] text-ellipsis whitespace-normal text-[13px] font-semibold leading-4 text-black no-underline md:h-9 md:text-sm md:font-medium"
        >
          {title}
        </Link>
      </div>
      {tag && (
        <div
          className="font-semibolds absolute right-2 top-2 flex w-10 select-none items-center justify-center rounded-md p-1 text-center text-xs text-white"
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
