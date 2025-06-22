import { cva } from 'cva'
import { category } from '@/lib/constants'
import { Category } from '@/types'

export type SizeItem = {
  size: string
  productId: string
}

export interface SizeGuideProps {
  current: string
  category: keyof typeof Category
  available: SizeItem[]
  onSelect(target: SizeItem): void
}

export const SIZE_VARIATIONS = {
  [category.suitcase]: ['S', 'M', 'L'],
  [category.backpack]: ['S', 'M'],
  [category.bag]: ['S', 'M'],
  [category.other]: []
}

const sizeItem = cva(
  'relative mr-1.5 w-16 rounded-2xl border-2 py-1.5 text-center text-sm font-medium transition-all select-none',
  {
    variants: {
      active: {
        true: 'border-stone-800 bg-stone-800 text-white',
        false: 'border-gray-200'
      },
      unavailable: {
        true: 'cursor-not-allowed text-gray-500'
      }
    },
    compoundVariants: [
      {
        unavailable: true,
        active: false,
        className:
          'border-gray-200 bg-gray-200 after:absolute after:top-3.5 after:left-3.5 after:h-0.5 after:w-8 after:rotate-45 after:bg-red-600/60'
      },
      {
        unavailable: false,
        active: false,
        className: 'cursor-pointer md:hover:border-gray-400'
      }
    ]
  }
)

export function SizeGuide({ category, current, available, onSelect }: SizeGuideProps) {
  const sizes = SIZE_VARIATIONS[category]

  const sizeMap = new Map(available.map((s) => [s.size, s.productId]))

  return (
    <div>
      <ul className="flex">
        {sizes.map((size, ind) => {
          const inStock = sizeMap.has(size)
          return (
            <li
              key={ind}
              onClick={() => {
                if (inStock) {
                  onSelect({ size, productId: sizeMap.get(size)! })
                }
              }}
              className={sizeItem({
                active: size === current,
                unavailable: !inStock
              })}
            >
              <span>{size}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
