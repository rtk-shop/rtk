import { formatPrice, getOrderStatusColor } from '@/lib/helpers'
import type { OrderStatus } from '@/types/order'
import { Icon } from '../ui/icon'
import { cva } from 'cva'
import { useTranslations } from 'next-intl'

export interface OrderItemProps {
  id: string
  status: keyof typeof OrderStatus
  price: number
  updatedAt: string
  createdAt: string
  //   meta
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

export function OrderItem({ id, price, status, expandId, isExpanded, onExpand }: OrderItemProps) {
  const t = useTranslations('Common.order')

  return (
    <div className="rounded-xl border border-gray-300 py-2.5 pl-2">
      <div onClick={() => onExpand(id)} className="grid grid-cols-8">
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
    </div>
  )
}
