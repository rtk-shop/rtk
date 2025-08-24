'use client'

import { useRouter } from 'next/navigation'
import { SizeGuide, type SizeItem } from '@/components/ui/size-guide'
import { CategoryType } from '@/lib/api/graphql/types'
import { routeNames } from '@/lib/routes'

export interface DetailsProps {
  category: CategoryType
  sizeName: string
  availableSizes: Array<{ size: string; productId: string }>
}

export function Sizes({ category, sizeName, availableSizes }: DetailsProps) {
  const router = useRouter()

  const handleSizeChange = (size: SizeItem) => {
    router.push(routeNames.product + size.productId, {
      scroll: false
    })
  }

  return (
    <section>
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
    </section>
  )
}
