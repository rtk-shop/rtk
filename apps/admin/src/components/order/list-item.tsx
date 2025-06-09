import { formatDate, formatPrice } from '@repo/utils'
import { StatusBadge } from './status-badge'
import type { OrderStatus } from '@/types/order'

export function OrderListItem({
  id,
  date,
  price,
  status,
  onClick
}: {
  id: string
  date: string
  price: number
  status: OrderStatus
  onClick(): void
}) {
  return (
    <li
      onClick={onClick}
      className="grid cursor-pointer grid-cols-12 gap-2 px-1 py-4.5 text-sm odd:bg-gray-50 hover:bg-gray-200 sm:rounded-xl sm:px-4 sm:py-4 sm:text-base"
    >
      <span className="col-span-2">{id}</span>
      <span className="col-span-4 overflow-hidden text-center text-ellipsis whitespace-nowrap">
        {formatDate(date, { dateStyle: 'short', timeStyle: 'short' })}
      </span>
      <span className="col-span-3 text-center font-medium">{formatPrice(price)}₴</span>
      <div className="col-span-3 text-end">
        <StatusBadge status={status} />
      </div>
    </li>
  )
}
