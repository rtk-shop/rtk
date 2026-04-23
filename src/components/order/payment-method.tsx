import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import {
  type OrderPaymentMethod,
  OrderPaymentMethod as OrderPaymentMethodEnum
} from '@/lib/api/graphql/types'

export function OrderPaymentMethodBadge({ method }: { method: OrderPaymentMethod }) {
  const t = useTranslations('Common.order.paymentMethod')

  const iconMap: Record<OrderPaymentMethod, React.ReactNode> = {
    [OrderPaymentMethodEnum.Online]: <Icon name="profile/credit-card" />,
    [OrderPaymentMethodEnum.Delivery]: <Icon name="profile/truck" />
  }

  return (
    <Box flex="row" align="center">
      <Box className="mr-1.5 text-xl">{iconMap[method]}</Box>
      <span className="font-medium">{t(method.toLowerCase())}</span>
    </Box>
  )
}
