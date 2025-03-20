import { cva } from 'cva'
import { category } from '@/lib/constants'
import { Category } from '@/types'

export interface SizeGuideProps {
  current: string
  category: keyof typeof Category
  available: string[]
  onSelect(size: string): void
}

export const SIZE_VARIATIONS = {
  [category.suitcase]: ['S', 'M', 'L'],
  [category.backpack]: ['S', 'M'],
  [category.bag]: ['S', 'M'],
  [category.other]: []
}

const sizeItem = cva(
  'relative mr-1.5 w-16 rounded-lg border-2 py-1 text-center text-sm font-medium transition-all select-none',
  {
    variants: {
      active: {
        true: 'border-black',
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
          'border-gray-200 bg-gray-200 after:absolute after:top-3 after:left-3.5 after:h-0.5 after:w-8 after:rotate-45 after:bg-red-600/60'
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

  const availableSet = new Set([...available])

  return (
    <div>
      <ul className="flex">
        {sizes.map((size, ind) => {
          const inStock = availableSet.has(size)

          return (
            <li
              key={ind}
              onClick={() => {
                if (inStock) {
                  onSelect(size)
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
