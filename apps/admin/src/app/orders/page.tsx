import { Header } from '@/components/layout/header'
import { StatusFilter } from './status-filter'
import { OrderTable } from './table/table'

export default function Page() {
  return (
    <div className="pr-3">
      <Header>
        <h1 className="text-lg font-medium">Заказы</h1>
      </Header>
      <StatusFilter />
      <OrderTable />
    </div>
  )
}
