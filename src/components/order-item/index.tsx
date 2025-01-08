import Image from 'next/image'
import { cva } from 'cva'
import { Icon } from '../ui/icon'
import { useTranslations } from 'next-intl'
import { HeightExpander } from '../ui/height-expander'
import { IconButton } from '../ui/icon-button'
import { formatDate, formatPhoneNumber, formatPrice, getOrderStatusColor } from '@/lib/helpers'
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
  expandId: string
  isExpanded: boolean
  onExpand(orderId: string): void
}

const expandIcon = cva('text-[26px] transition-all duration-300', {
  variants: {
    expand: {
      true: 'rotate-0',
      false: 'rotate-180'
    }
  }
})

export function OrderItem({
  id,
  price,
  status,
  receiverName,
  receiverSurname,
  receiverPhone,
  cityName,
  postOfficeName,
  parcelTrackId,
  updatedAt,
  createdAt,
  expandId,
  isExpanded,
  onExpand
}: OrderItemProps) {
  const t = useTranslations('Common.order')

  return (
    <div className="rounded-xl border border-gray-300">
      <div onClick={() => onExpand(id)} className="grid grid-cols-8 py-2.5 pl-2">
        <div className="col-span-2 text-start">ID {id}</div>
        <div
          className="col-span-2 font-medium"
          style={{
            color: getOrderStatusColor(status)
          }}
        >
          {t(`statuses.${status}`)}
        </div>
        <div className="col-span-3 text-center">{formatPrice(price)} ₴</div>
        <div className="col-span-1 flex items-center justify-center">
          <Icon
            name="common/arrow"
            className={expandIcon({ expand: expandId === id && isExpanded })}
          />
        </div>
      </div>
      <HeightExpander expanded={expandId === id && isExpanded}>
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
          <div className="mb-3 leading-snug">
            <p className="mb-0.5 font-medium">Информация о доставке</p>
            <p className="flex items-center">
              <span className="text-gray-500">Сервис: </span>
              <Image
                src="/icons/novaposta.svg"
                width={26}
                height={26}
                alt="Нова пошта"
                className="ml-1.5 mr-1"
              />
              <span>Нова пошта</span>
            </p>
            <p>
              <span className="text-gray-500">Адрес:</span> {cityName}, {postOfficeName}
            </p>
            <div className="flex items-center">
              <span className="mr-1 text-gray-500">Трекинг-номер:</span>
              {parcelTrackId ? parcelTrackId : '-'.repeat(24)}
              {parcelTrackId && (
                <IconButton className="ml-2 p-0 text-[22px] text-slate-600">
                  <Icon name="action/copy" />
                </IconButton>
              )}
            </div>
          </div>
          {/* Meta */}
          <div className="text-sm text-gray-600">
            <p>Обновлено: {formatDate(updatedAt, { dateStyle: 'short', timeStyle: 'short' })}</p>
          </div>
        </div>
      </HeightExpander>
    </div>
  )
}
