import { Suspense } from 'react'
import Stats from './stats'
import { StatsSkeleton } from './skeletons/stats'

export default function Dashboard() {
  return (
    <div className="p-[20px]">
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>
    </div>
  )
}
