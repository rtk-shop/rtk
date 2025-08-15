import { type ReactNode } from 'react'
import { cva } from 'cva'
import { OrderStatus } from '@/lib/api/graphql/types'
import { Icon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'

const iconStyle = cva('mr-0.5 shrink-0 text-[20px]', {
  variants: {
    status: {
      [OrderStatus.Rejected]: 'text-gray-500',
      [OrderStatus.Returned]: 'text-red-500',
      [OrderStatus.Processed]: 'text-black',
      [OrderStatus.Done]: 'text-green-700'
    }
  }
})

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const t = useTranslations('Common.order.statuses')

  let statusIcon: ReactNode

  switch (status) {
    case OrderStatus.Created:
      statusIcon = (
        <span className="relative mr-1 ml-0.5 flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500"></span>
        </span>
      )
      break
    case OrderStatus.Sent:
      statusIcon = (
        <span className="relative mr-1 ml-0.5 flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-blue-500"></span>
        </span>
      )
      break
    case OrderStatus.Processed:
      statusIcon = <Icon name="profile/timer" className={iconStyle({ status })} />
      break
    case OrderStatus.Done:
      statusIcon = <Icon name="profile/package-check" className={iconStyle({ status })} />
      break
    case OrderStatus.Rejected:
      statusIcon = <Icon name="profile/package-x" className={iconStyle({ status })} />
      break
    case OrderStatus.Returned:
      statusIcon = <Icon name="profile/package-x" className={iconStyle({ status })} />
      break
  }

  return (
    <div className="text-[15px] font-medium">
      <div className="flex items-center">
        {statusIcon}
        <span>{t(status.toLowerCase())}</span>
      </div>
    </div>
  )
}
