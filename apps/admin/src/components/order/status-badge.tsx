import { ReactNode } from 'react'
import { cva } from 'cva'
import { orderStatus } from '@/lib/constants'
import type { OrderStatus } from '@/types/order'

const view = cva(
  'rounded-xl px-2 py-1.5 text-xs font-medium whitespace-nowrap sm:px-3.5 sm:!text-sm',
  {
    variants: {
      status: {
        [orderStatus.sent]: 'bg-blue-100 text-blue-800',
        [orderStatus.rejected]: 'bg-gray-200 text-gray-500',
        [orderStatus.returned]: 'bg-red-100 text-red-500',
        [orderStatus.processed]: 'bg-yellow-100 text-amber-600',
        [orderStatus.done]: 'bg-green-100 text-green-700',
        [orderStatus.created]: '!p-0'
      }
    }
  }
)

export function StatusBadge({ status }: { status: OrderStatus }) {
  let statusName: ReactNode | string

  switch (status) {
    case orderStatus.created:
      statusName = (
        <div>
          <div className="flex items-center justify-end">
            <span className="relative mr-2 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
            <span>Создан</span>
          </div>
        </div>
      )
      break
    case orderStatus.processed:
      statusName = 'В обработке'
      break
    case orderStatus.sent:
      statusName = 'В дороге'
      break
    case orderStatus.done:
      statusName = 'Получен'
      break
    case orderStatus.rejected:
      statusName = 'Отменен'
      break
    case orderStatus.returned:
      statusName = 'Возврат'
      break
  }

  return <span className={view({ status })}>{statusName}</span>
}
