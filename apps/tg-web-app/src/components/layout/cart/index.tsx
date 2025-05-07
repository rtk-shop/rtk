'use client'

import { Drawer } from '@/components/ui/drawer'
import { CartInner } from './cart-inner'
import { useAppState } from '@/stores/app/store'

export function Cart() {
  const isCartOpen = useAppState((state) => state.isCartOpen)
  return (
    <Drawer position="right" open={isCartOpen} fullWidth>
      <div className="h-dvh overflow-hidden bg-white">
        <CartInner />
      </div>
    </Drawer>
  )
}
