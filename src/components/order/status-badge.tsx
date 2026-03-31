import { type ComponentType, type ReactNode } from 'react'
import { cva } from 'cva'
import { Icon, type IconName } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import { type OrderStatus, OrderStatus as OrderStatusEnum } from '@/lib/api/graphql/types'

const statusView = cva('leading-none font-medium tracking-tight whitespace-nowrap', {
  variants: {
    size: {
      normal: 'text-sm',
      xl: 'text-base'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

const iconStyle = cva('mr-0.5 shrink-0 text-black', {
  variants: {
    status: {
      [OrderStatusEnum.Created]: '',
      [OrderStatusEnum.Sent]: '',
      [OrderStatusEnum.Processed]: '',
      [OrderStatusEnum.Done]: 'text-green-600',
      [OrderStatusEnum.Rejected]: '',
      [OrderStatusEnum.Returned]: ''
    },
    size: {
      normal: 'size-4.5',
      xl: 'size-5'
    }
  },
  defaultVariants: {
    size: 'normal'
  }
})

type BadgeSize = 'normal' | 'xl'

type StatusIconProps = {
  size: BadgeSize
  className?: string
}

type StatusConfig = {
  icon?: ComponentType<StatusIconProps>
  label?: ReactNode
}

function CreatedStatusIcon() {
  return (
    <div className="mr-0.5">
      <Icon name="common/new" className="animate-tada size-7 text-black" />
    </div>
  )
}

function makeIcon(name: IconName): ComponentType<StatusIconProps> {
  return function StatusSvgIcon({ className }: StatusIconProps) {
    return <Icon name={name} className={className} />
  }
}

const statusConfig: Record<OrderStatus, StatusConfig> = {
  [OrderStatusEnum.Created]: {
    icon: CreatedStatusIcon
  },
  [OrderStatusEnum.Sent]: {
    icon: makeIcon('profile/truck')
  },
  [OrderStatusEnum.Processed]: {
    icon: makeIcon('profile/timer')
  },
  [OrderStatusEnum.Done]: {
    icon: makeIcon('profile/package-check')
  },
  [OrderStatusEnum.Rejected]: {
    icon: makeIcon('profile/circle-x')
  },
  [OrderStatusEnum.Returned]: {
    icon: makeIcon('profile/package-x')
  }
}

export function OrderStatusBadge({
  status,
  size = 'normal'
}: {
  status: OrderStatus
  size?: BadgeSize
}) {
  const t = useTranslations('Common.order.statuses')

  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <div className={statusView({ size })}>
      <div className="flex items-center">
        {StatusIcon && <StatusIcon size={size} className={iconStyle({ status, size })} />}
        <span>{config.label ?? t(status.toLowerCase())}</span>
      </div>
    </div>
  )
}
