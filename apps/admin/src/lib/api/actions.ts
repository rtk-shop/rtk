'use server'

import { getClient } from './urql-ssr'
import * as dashboardStats from './graphql/_gen_/dashboard-stats.query'
import * as order from './graphql/_gen_/order.query'

export async function getDashboardStats() {
  const result = await getClient().query<
    dashboardStats.DashboardStatsQuery,
    dashboardStats.DashboardStatsQueryVariables
  >(dashboardStats.DashboardStatsDocument, {})

  return result.data
}

export async function getOrder(id: string) {
  const result = await getClient().query<order.OrderByIdQuery, order.OrderByIdQueryVariables>(
    order.OrderByIdDocument,
    { id }
  )

  return result
}
