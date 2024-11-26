import { cva } from 'cva'

export type availableSizes = 'S' | 'M' | 'L' | 'XL' | '2XL'

interface SizeGuideProps {
  current: availableSizes
  available: availableSizes[]
}

const sizeItem = cva(
  'relative mr-1.5 w-16 select-none rounded-lg border-2 py-1 text-center text-sm font-medium transition-all',
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
        className: 'border-gray-200 bg-gray-200'
      },
      {
        unavailable: false,
        active: false,
        className: 'cursor-pointer md:hover:border-gray-400'
      }
    ]
  }
)

export function SizeGuide({ current, available }: SizeGuideProps) {
  const sizes: availableSizes[] = ['S', 'M', 'L', 'XL', '2XL']

  const normalized = available.reduce((acc, size) => ({ ...acc, [size]: undefined }), {})

  return (
    <div>
      <ul className="flex">
        {sizes.map((size) => (
          <li
            key={size}
            className={sizeItem({
              active: size === current,
              unavailable: !Object.prototype.hasOwnProperty.call(normalized, size)
            })}
          >
            <span>{size}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
