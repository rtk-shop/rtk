import { type ReactElement } from 'react'
import Image from 'next/image'
import { cva } from 'cva'
import { ProductTag } from '@/lib/api/graphql/types'

const container = cva(
  'flex w-10 items-center justify-center rounded-md p-1 text-center text-xs font-medium text-white select-none',
  {
    variants: {
      tag: {
        [ProductTag.New]: 'bg-black',
        [ProductTag.Top]: 'bg-tag-top',
        [ProductTag.Stock]: 'bg-red-500'
      }
    }
  }
)

export function TagBadge({
  tag,
  currentPrice,
  basePrice
}: {
  tag: ProductTag
  currentPrice: number
  basePrice: number
}) {
  let tagInner: ReactElement

  switch (tag) {
    case ProductTag.New:
      tagInner = <span>New</span>
      break
    case ProductTag.Top:
      tagInner = <Image width={18} height={18} src="/icons/fire.png" alt="товар з тегом - top" />
      break
    case ProductTag.Stock:
      tagInner = <span>-{Math.round(((basePrice - currentPrice) * 100) / basePrice)}%</span>
      break
  }

  return <div className={container({ tag })}>{tagInner}</div>
}
