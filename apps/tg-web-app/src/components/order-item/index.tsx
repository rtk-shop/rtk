import Image from 'next/image'
import { cva } from 'cva'
import { useRouter } from 'next/navigation'
import { FormatPrice } from '../ui/format-price'
import { HeightExpander } from '../ui/height-expander'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Button } from '@repo/ui'
import { routeNames } from '@/lib/routes'
import { DeliverySupplier } from '@repo/ui'
import { ExpandIcon } from '@/components/ui/expand-icon'
import { getOrderStatusColor } from '@/lib/helpers'
import { formatDate, formatPhoneNumber } from '@repo/utils'
import { useTranslations } from 'next-intl'
import { type OrderType } from '@/types/order'
import { OrderStatus } from '@/lib/api/graphql/types'

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

  const handleProductRedirect = (productId: string) => {
    router.push(routeNames.product + productId)
  }

  const handleDetailsClick = () => {
    router.push(routeNames.order + order.id)
  }

  return (
    <div className="rounded-xl bg-slate-100">
      <div onClick={() => onExpand(currentIndex)} className="grid grid-cols-8 py-2.5 pl-2">
        <div className="col-span-2 self-center text-start text-sm font-medium">№{order.id}</div>
        <div
          className="col-span-2 font-medium"
          style={{
            color: getOrderStatusColor(status)
          }}
        >
          {status === 'CREATED' ? (
            <div className="flex items-center">
              <span className="relative mr-2 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
              </span>
              <span>{t(`order.statuses.${status.toLowerCase()}`)}</span>
            </div>
          ) : (
            t(`order.statuses.${status.toLowerCase()}`)
          )}
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
              <li key={id} className="mb-2.5 flex items-center">
                <Image
                  src={product.preview}
                  className="rounded-lg"
                  width={44}
                  height={55}
                  style={{
                    width: 44,
                    height: 55
                  }}
                  alt={'изображение товара ' + product.title}
                  onClick={() => handleProductRedirect(product.id)}
                />
                <div className="ml-2 min-w-0 flex-[1_1_100%] self-start pt-0.5">
                  <p
                    onClick={() => handleProductRedirect(product.id)}
                    className="overflow-hidden font-medium text-ellipsis whitespace-nowrap"
                  >
                    {product.title}
                  </p>
                  <p className="text-sm font-medium">
                    <span className="mr-3">
                      {t('nouns.price')}: <FormatPrice price={priceAtOrder} />
                    </span>
                    <span> {quantity}шт.</span>
                  </p>
                </div>
              </li>
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
