import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { SectionWrapper } from './ui/section-wrapper'
import { SectionHeader } from './ui/section-header'
import { DeliverySupplier } from '@/components/ui/delivery-supplier'
import { ParcelTrackId } from '@/components/order/parcel-track-Id'
import { labelStyle } from './lib/constants'
import { type OrderStatus, OrderStatus as OrderStatusEnum } from '@/lib/api/graphql/types'

const hideTrackIdWhen: Array<OrderStatus> = [OrderStatusEnum.Created, OrderStatusEnum.Rejected]

export function Delivery({
  city,
  postOffice,
  supplier,
  parcelTrackId,
  status
}: {
  city: string
  postOffice: string
  supplier: string
  parcelTrackId?: string | null
  status: OrderStatus
}) {
  return (
    <SectionWrapper>
      <SectionHeader
        title="Інформація про доставку"
        icon={<Icon name="profile/truck" className="text-[23px]" />}
      />
      <Box className="mb-2.5 grid grid-cols-[40%_1fr] grid-rows-[auto_auto_auto] gap-2 text-sm leading-4 font-medium">
        <Box>
          <p className={labelStyle}>Сервіс</p>
        </Box>
        <Box>
          <DeliverySupplier supplier={supplier} />
        </Box>
        <Box>
          <p className={labelStyle}>Населений пункт</p>
        </Box>
        <Box>
          <p>{city}</p>
        </Box>
        <Box>
          <p className={labelStyle}>Місце доставки</p>
        </Box>
        <Box>
          <p>{postOffice}</p>
        </Box>
      </Box>
      {!hideTrackIdWhen.includes(status) && (
        <Box>
          <ParcelTrackId trackId={parcelTrackId} />
        </Box>
      )}
    </SectionWrapper>
  )
}
