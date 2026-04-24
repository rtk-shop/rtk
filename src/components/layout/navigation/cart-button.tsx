'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useCartQuery } from '@/lib/api/hooks'
import { useAppState } from '@/stores/app/store'

export function CartButton() {
  const openCart = useAppState((state) => state.openCart)
  const [result] = useCartQuery()

  const cartAmount = result.data?.cartProducts.reduce((acc, item) => item.quantity + acc, 0)

  return (
    <Button color="ghost" size="lg" onClick={openCart} className="bg-transparent text-[24px]">
      <Badge content={cartAmount}>
        <Icon name="common/cart" className="fill-white stroke-white" />
      </Badge>
    </Button>
  )
}
