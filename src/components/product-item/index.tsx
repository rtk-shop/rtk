import { useState, ReactElement } from 'react'
import { cva } from 'cva'
import Link from 'next/link'
import Image from 'next/image'
import { LikeButton } from '@/components/ui/like-button'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { SvgIcon } from '../ui/svg-icon'
import TrashIcon from '../../../public/icons/trash.svg'
import { routeNames } from '@/lib/constants'
import { formatPrice, getProductMainTagColor } from '@/lib/helpers'
import { useFavoriteStore } from '@/store/favorite'
import type { ProductTag } from '@/types'
import useTranslation from 'next-translate/useTranslation'

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
  const addToFavorite = useFavoriteStore((state) => state.add)
  const removeFavorite = useFavoriteStore((state) => state.remove)

  const { t } = useTranslation('common')
  const [isLiked, setLiked] = useState<boolean>(isFavorite)

  const handleActionClick = (): void => {
    if (isLiked) {
      removeFavorite(id)
    } else {
      addToFavorite(id)
    }

    setLiked(!isLiked)
  }

  function genTagView(productTag: string): ReactElement | null {
    switch (productTag) {
      case 'new':
        return <span>{t(`productTag.${tag}`)}</span>
      case 'top':
        return <Image width={19} height={19} src="/icons/fire.png" alt="смайлик - огонь" />
      case 'stock':
        return <span>-{Math.round(((basePrice - price) * 100) / basePrice)}%</span>
      default:
        return null
    }
  }

  return (
    <div className="relative mx-0.5 my-2 rounded-lg shadow transition-shadow hover:shadow-lg md:mx-1">
      <div>
        <Link
          href={routeNames.product + id}
          className={`rounded-t-lg border-none focus:ring-0 md:rounded-none ${!inStock ? 'opacity-50' : ''}`}
        >
          <ImagePlaceholder src={url} altText={title} />
        </Link>
      </div>
      <div className="px-2 py-1 pt-0 md:px-3">
        <div className="mb-1 flex items-center justify-between">
          <div
            className={priceBlock({
              discount: basePrice !== price,
              outStock: !inStock
            })}
          >
            {basePrice !== price && (
              <p className="text-[13px] font-medium text-gray-400 line-through">
                {formatPrice(basePrice)}&nbsp;$
              </p>
            )}
            <span>{formatPrice(price)}&nbsp;$</span>
          </div>
          <div className="p-1.5">
            {withDelete ? (
              <IconButton onClick={handleActionClick}>
                <SvgIcon className="fill-gray-500">
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            ) : (
              <LikeButton liked={isLiked} onClick={handleActionClick} />
            )}
          </div>
        </div>
        <Link
          href={routeNames.product + id}
          title={title}
          className="clear-both mb-1.5 line-clamp-2 h-[34px] text-ellipsis whitespace-normal text-[13px] font-semibold leading-4 text-black no-underline md:h-9 md:text-sm md:font-medium"
        >
          {title}
        </Link>
      </div>
      {tag && (
        <div
          className="font-semibolds absolute right-2 top-2 flex w-14 select-none items-center justify-center rounded-md p-1 text-center text-xs text-white"
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
