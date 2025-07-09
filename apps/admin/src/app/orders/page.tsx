import { Header } from '@/components/layout/header'
import { StatusFilter } from './status-filter'

export default function Page() {
  return (
    <div>
      <Header>
        <h1 className="text-lg font-medium">Заказы</h1>
      </Header>
      <StatusFilter />
    </div>
  )
}
