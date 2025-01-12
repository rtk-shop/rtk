import { type ReactElement } from 'react'
import Image from 'next/image'
import { cva } from 'cva'
import { Icon } from '../ui/icon'
import { useTranslations } from 'next-intl'
import { HeightExpander } from '../ui/height-expander'
import { formatDate, formatPhoneNumber, formatPrice, getOrderStatusColor } from '@/lib/helpers'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Button } from '../ui/button'
import { orderStatus } from '@/lib/constants'
import type { OrderStatus } from '@/types/order'

export interface OrderItemProps {
  id: string
  status: keyof typeof OrderStatus
  price: number
  receiverName: string
  receiverSurname: string
  receiverPhone: string
  supplier: string
  cityName: string
  postOfficeName: string
  parcelTrackId?: string | null
  updatedAt: string
  createdAt: string
  // controls
  index: number
  expandId: string
  isExpanded: boolean
  onExpand(orderId: string, index: number): void
  onReject(orderId: string): void
}

// todo: share it
const expandIcon = cva('text-[26px] transition-all duration-300', {
  variants: {
    expand: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

const validStatusesForReject: string[] = [
  orderStatus.created,
  orderStatus.accepted,
  orderStatus.processed
]

export function OrderItem({
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
  createdAt,
  expandId,
  isExpanded,
  index,
  onExpand,
  onReject
}: OrderItemProps) {
  const t = useTranslations('Common.order')

  const isOrderExpanded = expandId === id && isExpanded

  const handleRejectClick = () => {
    onReject(id)
  }

  function genSupplierView(supplier: string): ReactElement | string {
    switch (supplier) {
      case 'nova':
        return (
          <>
            <Image
              src="/icons/novaposta.svg"
              width={24}
              height={26}
              alt="Нова пошта"
              className="ml-1.5 mr-1"
            />
            <span>Нова пошта</span>
          </>
        )
      case 'ukrp':
        return (
          <>
            <Image
              src="/icons/urkposhta.svg"
              width={21}
              height={30}
              alt="Укрпошта"
              className="ml-1.5 mr-2"
            />
            <span>Укрпошта</span>
          </>
        )
      default:
        return supplier
    }
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
          <Icon name="common/arrow" className={expandIcon({ expand: isOrderExpanded })} />
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
              {genSupplierView(supplier)}
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
