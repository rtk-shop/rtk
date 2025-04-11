import Image from 'next/image'
import { cva } from 'cva'
import { useRouter } from 'next/navigation'
import { FormatPrice } from '../ui/format-price'
import { HeightExpander } from '../ui/height-expander'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Button } from '@repo/ui'
import { orderStatus, routeNames } from '@/lib/constants'
import { Supplier } from './supplier'
import { ExpandIcon } from '@/components/ui/expand-icon'
import { formatDate, formatPhoneNumber, getOrderStatusColor } from '@/lib/helpers'
import { useTranslations } from 'next-intl'
import { type OrderType } from '@/types/order'

export interface OrderItemProps {
  order: OrderType
  currentIndex: number
  expandIndex: number
  isExpanded: boolean
  onExpand(index: number): void
  onReject(orderId: string): void
}

const validStatusesForReject: string[] = [
  orderStatus.created,
  orderStatus.accepted,
  orderStatus.processed
]

const productList = cva('pt-2', {
  variants: {
    status: {
      [orderStatus.rejected]: 'opacity-40'
    }
  }
})

export function OrderItem({
  order,
  expandIndex,
  isExpanded,
  currentIndex,
  onExpand,
  onReject
}: OrderItemProps) {
  const t = useTranslations('Common.order')
  const router = useRouter()

  const {
    id,
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

  const handleRejectClick = () => {
    onReject(id)
  }

  return (
    <div className="rounded-xl bg-slate-100">
      <div onClick={() => onExpand(currentIndex)} className="grid grid-cols-8 py-2.5 pl-2">
        <div className="col-span-2 self-center text-start text-sm font-medium">№{id}</div>
        <div
          className="col-span-2 font-medium"
          style={{
            color: getOrderStatusColor(status)
          }}
        >
          {t(`statuses.${status.toLowerCase()}`)}
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
              <span className="font-medium">Получатель</span>
              <span className="text-sm text-gray-600">
                от {formatDate(createdAt, { day: 'numeric', month: 'numeric', year: 'numeric' })}
              </span>
            </p>
            <p>
              {receiverName} {receiverSurname}
            </p>
            <p>{formatPhoneNumber(receiverPhone)}</p>
          </div>
          {/* Delivery */}
          <div className="mb-3.5 leading-snug">
            <p className="mb-0.5 font-medium">Информация о доставке</p>
            <p className="flex items-center">
              <span className="text-gray-500">Сервис: </span>
              <Supplier supplier={supplier} />
            </p>
            <p>
              <span className="text-gray-500">Адрес:</span> {cityName}, {postOfficeName}
            </p>
            <div className="flex items-center">
              <span className="mr-1 text-gray-500">Трекинг-номер:</span>
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
                      Цена: <FormatPrice price={priceAtOrder} />
                    </span>
                    <span> {quantity}шт.</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {/* Controls */}
          {validStatusesForReject.includes(status) && (
            <div className="mb-2">
              <Button
                onClick={handleRejectClick}
                color="secondary"
                fullWidth
                className="bg-gray-200 pt-3 pb-3"
              >
                Отменить заказ
              </Button>
            </div>
          )}
          {/* Meta */}
          <div className="text-sm text-gray-600">
            <p>Обновлено: {formatDate(updatedAt, { dateStyle: 'short' })}</p>
          </div>
        </div>
      </HeightExpander>
    </div>
  )
}
