import { useTranslations } from 'next-intl'
import { HeightExpander } from '../ui/height-expander'
import { formatDate, formatPhoneNumber, formatPrice, getOrderStatusColor } from '@/lib/helpers'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Button } from '../ui/button'
import { orderStatus } from '@/lib/constants'
import { Supplier } from './supplier'
import { ExpandIcon } from '@/components/ui/expand-icon'
import type { OrderType } from '@/types/order'

export interface OrderItemProps {
  order: OrderType
  index: number
  expandId: string
  isExpanded: boolean
  onExpand(orderId: string, index: number): void
  onReject(orderId: string): void
}

const validStatusesForReject: string[] = [
  orderStatus.created,
  orderStatus.accepted,
  orderStatus.processed
]

export function OrderItem({
  order,
  expandId,
  isExpanded,
  index,
  onExpand,
  onReject
}: OrderItemProps) {
  const t = useTranslations('Common.order')

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

  const isOrderExpanded = expandId === id && isExpanded

  const handleRejectClick = () => {
    onReject(id)
  }

  return (
    <div className="rounded-xl bg-slate-100">
      <div
        onClick={() => {
          onExpand(id, index)
        }}
        className="grid grid-cols-8 py-2.5 pl-2"
      >
        <div className="col-span-2 text-start">ID {id}</div>
        <div
          className="col-span-2 font-medium"
          style={{
            color: getOrderStatusColor(status)
          }}
        >
          {t(`statuses.${status}`)}
        </div>
        <div className="col-span-3 text-center font-medium">{formatPrice(price)} ₴</div>
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
          {/* Controls */}
          {validStatusesForReject.includes(status) && (
            <div className="mb-2">
              <Button onClick={handleRejectClick} className="pb-3 pt-3" fullWidth>
                Отменить заказ
              </Button>
            </div>
          )}
          {/* Meta */}
          <div className="text-sm text-gray-600">
            <p>Обновлено: {formatDate(updatedAt, { dateStyle: 'short', timeStyle: 'short' })}</p>
          </div>
        </div>
      </HeightExpander>
    </div>
  )
}
