import { getDashboardStats } from '@/app/actions'
import { Orders } from './orders'
import { Products } from './products'
import { Users } from './users'

export default async function Stats() {
  const data = await getDashboardStats()

  return (
    <div className="flex">
      <Users count={data?.dashboardStats.users.count} />
      <Products count={data?.dashboardStats.products.count} />
      <Orders count={data?.dashboardStats.orders.count} />
    </div>
  )
}
