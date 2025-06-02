'use server'

import { getClient } from './urql-ssr'
import * as DashboardStats from './graphql/_gen_/dashboard-stats.query'

export async function getDashboardStats() {
  const result = await getClient().query<
    DashboardStats.DashboardStatsQuery,
    DashboardStats.DashboardStatsQueryVariables
  >(DashboardStats.DashboardStatsDocument, {})

  return result.data
}
