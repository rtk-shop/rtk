import { Orders } from './orders'
import { Products } from './products'
import { Users } from './users'
import { getDashboardStats } from '@/lib/api/queries'

export default async function Stats() {
  const data = await getDashboardStats()

  return (
    <div className="flex">
      <Users count={data?.dashboardStats.users.count} />
      <Orders count={data?.dashboardStats.orders.count} />
      <Products count={data?.dashboardStats.products.count} />
    </div>
  )
}
