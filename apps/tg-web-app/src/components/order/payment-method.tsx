import { OrderPaymentMethod } from '@/lib/api/graphql/types'
import { useTranslations } from 'next-intl'

export function OrderPaymentMethodBadge({ method }: { method: OrderPaymentMethod }) {
  const t = useTranslations('Common.order.paymentMethod')
  return (
    <div className="font-medium">
      <span>{t(method.toLowerCase())}</span>
    </div>
  )
}
