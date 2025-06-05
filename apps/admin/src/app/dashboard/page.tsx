import { Suspense } from 'react'
import Stats from './stats'
import { StatsSkeleton } from './skeletons/stats'
import { OrdersHeader } from '@/components/orders-list-header'

export default function Dashboard() {
  return (
    <div className="p-[10px]">
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <div className="mt-[50px]">
        <OrdersHeader />
      </div>
    </div>
  )
}
