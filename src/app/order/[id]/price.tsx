import { cva } from 'cva'
import { Box } from '@/components/ui/box'
import { SectionWrapper } from './ui/section-wrapper'
import { FormatPrice } from '@/components/ui/format-price'
import { OrderPaymentMethodBadge } from '@/components/order/payment-method'
import {
  type OrderStatus,
  type OrderPaymentMethod,
  OrderStatus as OrderStatusEnum
} from '@/lib/api/graphql/types'

const sectionTitle = cva('text-sm font-medium tracking-tight text-gray-400')

export interface PriceProps {
  orderStatus: OrderStatus
  orderPrice: number
  paymentMethod: OrderPaymentMethod
  payment?: React.ReactNode
}

const hidePaymentWhen: Array<OrderStatus> = [
  OrderStatusEnum.Created,
  OrderStatusEnum.Done,
  OrderStatusEnum.Rejected
]

export function Price({ orderPrice, orderStatus, paymentMethod, payment }: PriceProps) {
  return (
    <SectionWrapper>
      <Box flex="row">
        <Box className="relative basis-6/10">
          <p className={sectionTitle()}>Сума</p>
          <Box className="text-[28px]">
            <FormatPrice size="controlled" price={orderPrice} />
          </Box>
          <div className="absolute top-0 right-7 h-full w-0.5 bg-gray-100" />
        </Box>
        <Box className="basis-4/10">
          <p className={sectionTitle({ className: 'mb-1' })}>Спосіб оплати</p>
          <OrderPaymentMethodBadge method={paymentMethod} />
        </Box>
      </Box>
      {!hidePaymentWhen.includes(orderStatus) && <Box>{payment}</Box>}
    </SectionWrapper>
  )
}
