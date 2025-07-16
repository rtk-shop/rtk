import { type ReactNode } from 'react'
import { cva } from 'cva'
import { orderStatus } from '@/lib/constants'
import { Timer, PackageCheck, PackageX, CircleX } from 'lucide-react'
import type { OrderStatus } from '@/types/order'

const view = cva('rounded-lg text-xs whitespace-nowrap', {
  variants: {
    status: {
      [orderStatus.sent]: '',
      [orderStatus.rejected]: '',
      [orderStatus.returned]: '',
      [orderStatus.processed]: '',
      [orderStatus.done]: '',
      [orderStatus.created]: ''
    }
  }
})

export function StatusBadge({ status }: { status: OrderStatus }) {
  let statusName: ReactNode

  switch (status) {
    case orderStatus.created:
      statusName = (
        <>
          <span className="relative mr-1.5 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span>Создан</span>
        </>
      )
      break
    case orderStatus.processed:
      statusName = (
        <>
          <Timer className="mr-1 size-4" />
          <span className="leading-none">В обработке</span>
        </>
      )
      break
    case orderStatus.sent:
      statusName = (
        <>
          <span className="relative mr-1.5 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
          </span>
          <span>В дороге</span>
        </>
      )
      break
    case orderStatus.done:
      statusName = (
        <>
          <PackageCheck className="mr-1 size-4 text-green-700" />
          <span className="leading-none">Получен</span>
        </>
      )
      break
    case orderStatus.rejected:
      statusName = (
        <>
          <CircleX className="mr-1 size-4 text-gray-500" />
          <span className="leading-none">Отменен</span>
        </>
      )
      break
    case orderStatus.returned:
      statusName = (
        <>
          <PackageX className="mr-1 size-4 text-red-500" />
          <span className="leading-none">Возврат</span>
        </>
      )
      break
  }

  return (
    <div className={view({ status })}>
      <div className="flex items-center">{statusName}</div>
    </div>
  )
}
