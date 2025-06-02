'use client'

import { useQuery } from 'urql'
import { Orders } from './orders'
import { Products } from './products'
import { Users } from './users'

import {
  DashboardStatsQuery,
  DashboardStatsQueryVariables,
  DashboardStatsDocument
} from '@/lib/api/graphql/_gen_/dashboard-stats.query'

export function Stats() {
  const [result] = useQuery<DashboardStatsQuery, DashboardStatsQueryVariables>({
    query: DashboardStatsDocument
  })

  console.log(result.data)

  return (
    <div className="flex p-[20px]">
      <Users count={result.data?.dashboardStats.users.count || 0} />
      <Orders count={result.data?.dashboardStats.orders.count || 0} />
      <Products count={result.data?.dashboardStats.products.count || 0} />
    </div>
  )
}
