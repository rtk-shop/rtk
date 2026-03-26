import { type ComponentType, type ReactNode } from 'react'
import { cva } from 'cva'
import { Icon, type IconName } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import { OrderStatus, type OrderStatus as TOrderStatus } from '@/lib/api/graphql/types'

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
      [OrderStatus.Created]: '',
      [OrderStatus.Sent]: '',
      [OrderStatus.Processed]: '',
      [OrderStatus.Done]: 'text-green-600',
      [OrderStatus.Rejected]: '',
      [OrderStatus.Returned]: ''
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
      <Icon name="common/new" className="animate-tada size-7" />
    </div>
  )
}

function makeIcon(name: IconName): ComponentType<StatusIconProps> {
  return function StatusSvgIcon({ className }: StatusIconProps) {
    return <Icon name={name} className={className} />
  }
}

const statusConfig: Record<TOrderStatus, StatusConfig> = {
  [OrderStatus.Created]: {
    icon: CreatedStatusIcon
  },
  [OrderStatus.Sent]: {
    icon: makeIcon('profile/truck')
  },
  [OrderStatus.Processed]: {
    icon: makeIcon('profile/timer')
  },
  [OrderStatus.Done]: {
    icon: makeIcon('profile/package-check')
  },
  [OrderStatus.Rejected]: {
    icon: makeIcon('profile/circle-x')
  },
  [OrderStatus.Returned]: {
    icon: makeIcon('profile/package-x')
  }
}

export function OrderStatusBadge({
  status,
  size = 'normal'
}: {
  status: TOrderStatus
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
