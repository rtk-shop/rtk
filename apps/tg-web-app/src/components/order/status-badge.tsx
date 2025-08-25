import { type ReactElement } from 'react'
import { cva } from 'cva'
import { OrderStatus } from '@/lib/api/graphql/types'
import { Icon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'

const statusView = cva('font-medium', {
  variants: {
    size: {
      normal: 'text-[15px]',
      XL: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

const iconStyle = cva('shrink-0', {
  variants: {
    status: {
      [OrderStatus.Rejected]: 'text-gray-500',
      [OrderStatus.Returned]: 'text-red-500',
      [OrderStatus.Processed]: 'text-black',
      [OrderStatus.Done]: 'text-green-700'
    },
    size: {
      normal: 'mr-0.5 text-[20px]',
      XL: 'mr-1 text-[24px]'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

export function OrderStatusBadge({
  status,
  size
}: {
  status: OrderStatus
  size?: 'normal' | 'XL'
}) {
  const t = useTranslations('Common.order.statuses')

  let statusIcon: ReactElement

  switch (status) {
    case OrderStatus.Created:
      statusIcon = (
        <span className="relative mr-1 ml-0.5 flex size-3 justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-green-500"></span>
        </span>
      )
      break
    case OrderStatus.Sent:
      statusIcon = (
        <span className="relative mr-1 ml-0.5 flex size-3 justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-blue-500" />
        </span>
      )
      break
    case OrderStatus.Processed:
      statusIcon = <Icon name="profile/timer" className={iconStyle({ status, size })} />
      break
    case OrderStatus.Done:
      statusIcon = <Icon name="profile/package-check" className={iconStyle({ status, size })} />
      break
    case OrderStatus.Rejected:
      statusIcon = <Icon name="profile/package-x" className={iconStyle({ status, size })} />
      break
    case OrderStatus.Returned:
      statusIcon = <Icon name="profile/package-x" className={iconStyle({ status, size })} />
      break
  }

  return (
    <div className={statusView({ size })}>
      <div className="flex items-center">
        {statusIcon}
        <span>{t(status.toLowerCase())}</span>
      </div>
    </div>
  )
}
