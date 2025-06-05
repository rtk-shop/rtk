import { Suspense } from 'react'
import Stats from './stats'
import { StatsSkeleton } from './skeletons/stats'
import { OrdersHeader } from '@/components/orders-list-header'
import { Orders } from './orders'

export default function Dashboard() {
  return (
    <div className="p-[10px]">
      <div className="mb-5">
        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>
      </div>
      <OrdersHeader />
      <Orders />
    </div>
  )
}
