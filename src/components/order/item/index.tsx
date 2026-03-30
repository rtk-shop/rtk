import { Box } from '@/components/ui/box'
import { cva } from 'cva'
import { useRouter } from 'next/navigation'
import { FormatPrice } from '../../ui/format-price'
import { HeightExpander } from '../../ui/height-expander'
import { Button } from '@/components/ui/button'
import { routeNames } from '@/lib/routes'
import { DeliverySupplier } from '@/components/ui/delivery-supplier'
import { ExpandIcon } from '@/components/ui/expand-icon'
import { formatDate, formatPhoneNumber } from '@/lib/helpers'
import { useTranslations } from 'next-intl'
import { OrderProductItem } from '../../order-product-item'
import { OrderStatusBadge } from '../status-badge'
import { ParcelTrackId } from '../parcel-track-Id'
import { OrderStatus as OrderStatusEnum } from '@/lib/api/graphql/types'
import { type OrderType } from '@/types/order'

export interface OrderItemProps {
  order: OrderType
  currentIndex: number
  expandIndex: number
  isExpanded: boolean
  onExpand(index: number): void
}

const productList = cva('pt-2', {
  variants: {
    status: {
      [OrderStatusEnum.Rejected]: 'opacity-40'
    }
  }
})

export function OrderItem({
  order,
  expandIndex,
  isExpanded,
  currentIndex,
  onExpand
}: OrderItemProps) {
  const t = useTranslations('Common')
  const router = useRouter()

  const {
    price,
    status,
    receiverName,
    receiverSurname,
    receiverPhone,
    supplier,
    cityName,
    postOfficeName,
    parcelTrackId,
    updatedAt,
    createdAt
  } = order

  const isOrderExpanded = expandIndex === currentIndex && isExpanded

  const handleDetailsClick = () => {
    router.push(routeNames.order + order.id)
  }

  return (
    <Box className="rounded-xl bg-slate-100">
      <Box onClick={() => onExpand(currentIndex)} className="grid grid-cols-8 py-2.5 pl-2">
        <Box className="col-span-2 self-center text-start font-medium">
          <span className="text-sm leading-none">№{order.id}</span>
        </Box>
        <Box className="col-span-2 self-center">
          <OrderStatusBadge status={status} />
        </Box>
        <Box className="col-span-3 self-center text-center">
          <FormatPrice price={price} size="sm" />
        </Box>
        <Box className="col-span-1 flex items-center justify-center">
          <ExpandIcon expanded={isOrderExpanded} />
        </Box>
      </Box>
      <HeightExpander expanded={isOrderExpanded}>
        {/* User info */}
        <Box className="p-2 pt-0">
          <Box className="mb-2 leading-snug">
            <p className="mb-0.5 flex justify-between">
              <span className="font-medium">{t('order.receiver')}</span>
              <span className="text-sm text-gray-600">
                {t('order.from')}&nbsp;
                {formatDate(createdAt, { day: 'numeric', month: 'numeric', year: 'numeric' })}
              </span>
            </p>
            <p>
              {receiverName} {receiverSurname}
            </p>
            <p>{formatPhoneNumber(receiverPhone)}</p>
          </Box>
          {/* Delivery */}
          <Box className="mb-3.5 leading-snug">
            <p className="mb-0.5 font-medium">{t('order.delivery.title')}</p>
            <p className="flex items-center">
              <span className="mr-1 text-gray-500">{t('order.delivery.service')}:</span>
              <DeliverySupplier supplier={supplier} />
            </p>
            <p>
              <span className="text-gray-500">{t('order.delivery.address')}:</span> {cityName},{' '}
              {postOfficeName}
            </p>
            {status !== OrderStatusEnum.Rejected && status !== OrderStatusEnum.Created && (
              <Box className="pt-0.5">
                <span className="mr-1 text-gray-500">{t('order.delivery.tracking')}:</span>
                <ParcelTrackId trackId={parcelTrackId} />
              </Box>
            )}
          </Box>
          {/* Products */}
          <Box as="ul" className={productList({ status: status === 'REJECTED' ? status : null })}>
            {order.products.map(({ id, quantity, priceAtOrder, product }) => (
              <OrderProductItem
                key={id}
                quantity={quantity}
                priceAtOrder={priceAtOrder}
                product={product}
              />
            ))}
          </Box>
          {/* Controls */}
          <Box className="mb-2">
            <Button
              color="secondary"
              fullWidth
              onClick={handleDetailsClick}
              className="bg-slate-200 pt-2 pb-2"
            >
              {t('order.details')}
            </Button>
          </Box>
          {/* Meta */}
          <Box className="text-sm text-gray-600">
            <p>
              {t('adjectives.updated')}:{' '}
              {formatDate(updatedAt, { dateStyle: 'short', timeStyle: 'short' })}
            </p>
          </Box>
        </Box>
      </HeightExpander>
    </Box>
  )
}
