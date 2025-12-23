import { type ReactElement } from 'react'
import { cva } from 'cva'
import { PaymentStatus } from '@/lib/api/graphql/types'
import { Icon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'

const container = cva(
  'flex h-8 items-center justify-center rounded-lg text-sm font-medium select-none',
  {
    variants: {
      status: {
        [PaymentStatus.AwaitingConfirmation]: 'bg-gray-200',
        [PaymentStatus.Confirmed]: 'bg-green-lime/30',
        [PaymentStatus.Rejected]: 'bg-red-100'
      }
    }
  }
)

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const t = useTranslations('Common.payment.statuses')

  let statusIcon: ReactElement

  switch (status) {
    case PaymentStatus.AwaitingConfirmation:
      statusIcon = <Icon name="profile/timer" className="text-xl" />
      break
    case PaymentStatus.Confirmed:
      statusIcon = (
        <Icon name="common/check" className="rounded-full bg-green-500 p-1 text-xs text-white" />
      )
      break
    case PaymentStatus.Rejected:
      statusIcon = (
        <span className="relative flex size-2.5 justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
        </span>
      )
      break
  }

  return (
    <div className={container({ status })}>
      {statusIcon}
      <span className="ml-1">{t(status.toLowerCase())}</span>
    </div>
  )
}
