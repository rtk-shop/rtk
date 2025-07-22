import { type ReactNode } from 'react'
import { cva } from 'cva'
import { OrderStatus } from '@/lib/api/graphql/types'
import { Timer, PackageCheck, PackageX, CircleX } from 'lucide-react'

const view = cva('rounded-lg text-xs whitespace-nowrap', {
  variants: {
    status: {
      [OrderStatus.Sent]: '',
      [OrderStatus.Rejected]: '',
      [OrderStatus.Returned]: '',
      [OrderStatus.Processed]: '',
      [OrderStatus.Done]: '',
      [OrderStatus.Created]: ''
    }
  }
})

export function StatusBadge({ status }: { status: OrderStatus }) {
  let statusEl: ReactNode

  switch (status) {
    case OrderStatus.Created:
      statusEl = (
        <>
          <span className="relative mr-1.5 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
          </span>
          <span>Создан</span>
        </>
      )
      break
    case OrderStatus.Processed:
      statusEl = (
        <>
          <Timer className="mr-1 size-4" />
          <span className="leading-none">В обработке</span>
        </>
      )
      break
    case OrderStatus.Sent:
      statusEl = (
        <>
          <span className="relative mr-1.5 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
          </span>
          <span>В дороге</span>
        </>
      )
      break
    case OrderStatus.Done:
      statusEl = (
        <>
          <PackageCheck className="mr-1 size-4 text-green-700" />
          <span className="leading-none">Получен</span>
        </>
      )
      break
    case OrderStatus.Rejected:
      statusEl = (
        <>
          <CircleX className="mr-1 size-4 text-gray-500" />
          <span className="leading-none">Отменен</span>
        </>
      )
      break
    case OrderStatus.Returned:
      statusEl = (
        <>
          <PackageX className="mr-1 size-4 text-red-500" />
          <span className="leading-none">Возврат</span>
        </>
      )
      break
  }

  return (
    <div className={view({ status })}>
      <div className="flex items-center">{statusEl}</div>
    </div>
  )
}
