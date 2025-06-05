import { ReactNode } from 'react'
import { formatDate, formatPrice } from '@repo/utils'
import { OrderStatus } from '@/types/order'

export function OrderListItem({
  id,
  date,
  price,
  status
}: {
  id: string
  date: string
  price: number
  status: keyof typeof OrderStatus
}) {
  let statusName: ReactNode | string = ''

  switch (status) {
    case 'CREATED':
      statusName = (
        <span className="flex items-center justify-end">
          <span className="relative mr-2 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span>Создан</span>
        </span>
      )
      break
    case 'PROCESSED':
      statusName = 'В обработке'
      break
    case 'ACCEPTED':
      statusName = 'Принят'
      break
    case 'SENT':
      statusName = 'В дороге'
      break
    case 'DONE':
      statusName = <span className="text-green-600">Получен</span>
      break
    case 'REJECTED':
      statusName = <span className="text-gray-500">Отменен</span>
      break
    case 'RETURNED':
      statusName = <span className="text-red-500">Возврат</span>
      break
  }

  return (
    <li className="grid cursor-pointer grid-cols-12 gap-2 px-1 py-4 odd:bg-gray-50 hover:bg-gray-200 sm:rounded-xl sm:px-4">
      <span className="col-span-2">{id}</span>
      <span className="col-span-4 text-center">
        {formatDate(date, { dateStyle: 'short', timeStyle: 'short' })}
      </span>
      <span className="col-span-3 text-center font-medium">{formatPrice(price)}₴</span>
      <span className="col-span-3 overflow-hidden text-end text-ellipsis whitespace-nowrap">
        {statusName}
      </span>
    </li>
  )
}
