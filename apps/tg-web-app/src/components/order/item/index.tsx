import { cva } from 'cva'
import { useRouter } from 'next/navigation'
import { FormatPrice } from '../../ui/format-price'
import { HeightExpander } from '../../ui/height-expander'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Button } from '@/components/ui/button'
import { routeNames } from '@/lib/routes'
import { DeliverySupplier } from '@repo/ui'
import { ExpandIcon } from '@/components/ui/expand-icon'
import { formatDate, formatPhoneNumber } from '@repo/utils'
import { useTranslations } from 'next-intl'
import { type OrderType } from '@/types/order'
import { OrderStatus } from '@/lib/api/graphql/types'
import { OrderProductItem } from '../../order-product-item'
import { OrderStatusBadge } from '../status-badge'

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
      [OrderStatus.Rejected]: 'opacity-40'
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
    <div className="rounded-xl bg-slate-100">
      <div onClick={() => onExpand(currentIndex)} className="grid grid-cols-8 py-2.5 pl-2">
        <div className="col-span-2 self-center text-start text-sm font-medium">№{order.id}</div>
        <div className="col-span-2">
          <OrderStatusBadge status={status} />
        </div>
        <div className="col-span-3 text-center">
          <FormatPrice price={price} />
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <ExpandIcon expanded={isOrderExpanded} />
        </div>
      </div>
      <HeightExpander expanded={isOrderExpanded}>
        {/* User info */}
        <div className="p-2 pt-0">
          <div className="mb-2 leading-snug">
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
          </div>
          {/* Delivery */}
          <div className="mb-3.5 leading-snug">
            <p className="mb-0.5 font-medium">{t('order.delivery.title')}</p>
            <p className="flex items-center">
              <span className="mr-1 text-gray-500">{t('order.delivery.service')}: </span>
              <DeliverySupplier supplier={supplier} />
            </p>
            <p>
              <span className="text-gray-500">{t('order.delivery.address')}:</span> {cityName},{' '}
              {postOfficeName}
            </p>
            <div className="flex items-center">
              <span className="mr-1 text-gray-500">{t('order.delivery.tracking')}:</span>
              {parcelTrackId ? parcelTrackId : '-'.repeat(24)}
              {parcelTrackId && <CopyToClipboard what={parcelTrackId} />}
            </div>
          </div>
          {/* Products */}
          <ul className={productList({ status: status === 'REJECTED' ? status : null })}>
            {order.products.map(({ id, quantity, priceAtOrder, product }) => (
              <OrderProductItem
                key={id}
                quantity={quantity}
                priceAtOrder={priceAtOrder}
                product={product}
              />
            ))}
          </ul>
          {/* Controls */}
          <div className="mb-2">
            <Button
              color="secondary"
              fullWidth
              onClick={handleDetailsClick}
              className="bg-gray-200 pt-3 pb-3"
            >
              {t('order.details')}
            </Button>
          </div>
          {/* Meta */}
          <div className="text-sm text-gray-600">
            <p>
              {t('adjectives.updated')}: {formatDate(updatedAt, { dateStyle: 'short' })}
            </p>
          </div>
        </div>
      </HeightExpander>
    </div>
  )
}
