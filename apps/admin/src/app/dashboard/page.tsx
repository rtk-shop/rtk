import { Suspense } from 'react'
import Stats from './stats'
import { StatsSkeleton } from './skeletons/stats'
import { OrdersHeader } from '@/components/orders-list-header'
import { Orders } from './orders'

export default function Dashboard() {
  return (
    <div className="flex h-dvh flex-col p-[8px]">
      <div className="mb-5">
        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>
      </div>
      <div className="flex grow">
        {/* mt-auto */}
        <div className="w-full">
          <OrdersHeader />
          <Orders />
        </div>
      </div>
    </div>
  )
}
