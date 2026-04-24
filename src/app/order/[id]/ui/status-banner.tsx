import { ComponentType } from 'react'
import { cva } from 'cva'
import { Box } from '@/components/ui/box'
import { Icon, type IconName } from '@/components/ui/icon'
import { type OrderStatus, OrderStatus as OrderStatusEnum } from '@/lib/api/graphql/types'

const bannerStyle = cva('flex items-center rounded-xl border p-3 px-4', {
  variants: {
    status: {
      [OrderStatusEnum.Created]: 'border-green-200 bg-green-100 text-green-900',
      [OrderStatusEnum.Processed]: 'border-blue-200 bg-sky-100 text-sky-900',
      [OrderStatusEnum.Sent]: 'border-indigo-200 bg-indigo-100 text-indigo-900',
      [OrderStatusEnum.Done]: 'border-green-200 bg-emerald-100 text-emerald-900',
      [OrderStatusEnum.Rejected]: 'border-gray-200 bg-gray-100 text-zinc-800',
      [OrderStatusEnum.Returned]: 'border-red-200 bg-rose-100 text-rose-900'
    }
  }
})

type StatusIconProps = {
  className?: string
}

type StatusBanner = {
  icon?: ComponentType<StatusIconProps>
  title: string
  description: string
}

function CreatedStatusIcon() {
  return (
    <div className="pt-1">
      <Icon name="common/new" className="animate-tada size-7 text-black" />
    </div>
  )
}

function makeIcon(name: IconName): ComponentType<StatusIconProps> {
  return function StatusSvgIcon({ className }: StatusIconProps) {
    return <Icon name={name} className={className} />
  }
}

const statusConfig: Record<OrderStatus, StatusBanner> = {
  [OrderStatusEnum.Created]: {
    title: 'Нове замовлення',
    description: 'Дякуемо! Ми все перевіримо та почнемо його обробку',
    icon: CreatedStatusIcon
  },
  [OrderStatusEnum.Processed]: {
    title: 'В обробці',
    description: 'Вже працюємо над Вашим замовленням',
    icon: makeIcon('profile/clock')
  },
  [OrderStatusEnum.Sent]: {
    title: 'В дорозі',
    description: 'Замовлення відправлено, очікуйте на ТТН',
    icon: makeIcon('profile/truck')
  },
  [OrderStatusEnum.Done]: {
    title: 'Отримано',
    description: 'Замовлення видано одержувачу, дякуємо!',
    icon: makeIcon('profile/package-check')
  },
  [OrderStatusEnum.Rejected]: {
    title: 'Скасовано',
    // todo: add "repeat order" button then
    description: 'Якщо це було випадково, зробіть повторне замовлення',
    icon: makeIcon('profile/circle-x')
  },
  [OrderStatusEnum.Returned]: {
    title: 'Повернуто',
    description: 'Замовлення було повернуто отримувачем',
    icon: makeIcon('profile/package-x')
  }
}

export function StatusBanner({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]
  const StatusIcon = config.icon

  return (
    <Box className={bannerStyle({ status })}>
      <Box className="flex size-11 shrink-0 items-center justify-center self-start rounded-full border border-inherit bg-current/8">
        {StatusIcon && <StatusIcon className="text-xl" />}
      </Box>
      <Box className="pl-4 leading-3.5">
        <p className="mb-1 font-medium">{statusConfig[status].title}</p>
        <p className="text-sm leading-3.5 text-current/70">{statusConfig[status].description}</p>
      </Box>
    </Box>
  )
}
