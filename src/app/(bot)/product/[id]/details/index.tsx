'use client'

import { SizeGuide } from '@/components/ui/size-guide'
import { Controls } from './controls'
import { AddToCartButton } from './add-to-cart'
import { Category } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation'

export interface DetailsProps {
  productId: string
  category: keyof typeof Category
  sizeName: string
  inStock: boolean
  availableSizes: string[]
}

export function useUpdateURL() {
  const router = useRouter()

  return (state: Record<string, string>) => {
    const newParams = new URLSearchParams(window.location.search)
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value)
    })
    router.push(`?${newParams.toString()}`, { scroll: false })
  }
}

export function Details({ productId, inStock, category, sizeName, availableSizes }: DetailsProps) {
  const updateURL = useUpdateURL()

  const params = useSearchParams()

  const selectedSize = params.get('size') || sizeName

  const handleSizeChange = (size: string) => {
    updateURL({
      size
    })
  }

  return (
    <section className="px-1.5">
      <p className="mb-2 font-medium">Выберите размер:</p>
      <SizeGuide
        category={category}
        current={selectedSize}
        available={availableSizes}
        onSelect={handleSizeChange}
      />
      <AddToCartButton productId={productId} inStock={inStock} />
      <Controls productId={productId} />
    </section>
  )
}
