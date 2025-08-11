'use client'
import { FormatPrice } from '@/components/ui/format-price'
// const validStatusesForReject: OrderStatus[] = [OrderStatus.Created, OrderStatus.Processed]

// const openRejectModal = usePageState((state) => state.onRejectOrderModal)
// const setCurrentOrderId = usePageState((state) => state.setCurrentOrderId)

export interface OrderControlsProps {
  orderPrice: number
}

export function OrderControls({ orderPrice }: OrderControlsProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Сумма</h2>
        <div>
          <FormatPrice price={orderPrice} />
        </div>
      </div>
    </section>
  )
}
