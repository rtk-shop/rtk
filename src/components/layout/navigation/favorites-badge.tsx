'use client'

import { Badge } from '@/components/ui/badge'
import { Icon } from '@/components/ui/icon'
import { useFavoriteStore } from '@/providers/favorite-store-provider'

export function FavoritesBadge() {
  const [favoriteAmount] = useFavoriteStore((state) => state.amount)

  return (
    <Badge content={favoriteAmount}>
      <Icon name="common/heart" className="bg-sl fill-transparent stroke-white text-[23px]" />
    </Badge>
  )
}
