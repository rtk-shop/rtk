import { Users } from './stats/users'
import { Orders } from './stats/orders'
import { Products } from './stats/products'

export default function Dashboard() {
  return (
    <div className="flex p-[20px]">
      <Users />
      <Orders />
      <Products />
    </div>
  )
}
