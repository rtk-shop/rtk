'use client'

import { useRouter } from 'next/navigation'
import { SizeGuide, type SizeItem } from '@/components/ui/size-guide'
import { Controls } from './controls'
import { AddToCartButton } from './add-to-cart'
import { Category } from '@/types'
import { routeNames } from '@/lib/routes'

export interface DetailsProps {
  productId: string
  category: keyof typeof Category
  sizeName: string
  inStock: boolean
  availableSizes: Array<{ size: string; productId: string }>
}

// export function useUpdateURL() {
//   const router = useRouter()

//   return (state: Record<string, string>) => {
//     const newParams = new URLSearchParams(window.location.search)
//     Object.entries(state).forEach(([key, value]) => {
//       newParams.set(key, value)
//     })
//     router.push(`?${newParams.toString()}`, { scroll: false })
//   }
// }
// const updateURL = useUpdateURL()

export function Details({ productId, inStock, category, sizeName, availableSizes }: DetailsProps) {
  const router = useRouter()

  const handleSizeChange = (size: SizeItem) => {
    router.push(routeNames.product + size.productId, {
      scroll: false
    })
  }

  return (
    <section className="px-1.5">
      {sizeName !== 'none' && (
        <>
          <p className="mb-2 font-medium">Выберите размер:</p>
          <SizeGuide
            category={category}
            current={sizeName}
            available={availableSizes}
            onSelect={handleSizeChange}
          />
        </>
      )}
      <AddToCartButton productId={productId} inStock={inStock} />
      <Controls productId={productId} />
    </section>
  )
}
