import { Box } from '@/components/ui/box'
import { BoxSection } from './ui/box-section'
import { DeliverySupplier } from '@/components/ui/delivery-supplier'
import { ParcelTrackId } from '@/components/order/parcel-track-Id'
import { Icon } from '@/components/ui/icon'
import { type OrderStatus, OrderStatus as OrderStatusEnum } from '@/lib/api/graphql/types'

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
    <BoxSection
      title="Інформація про доставку"
      icon={<Icon name="profile/truck" className="mr-0.5 text-[22px] text-gray-800" />}
    >
      <Box className="leading-tight">
        <div className="flex items-center">
          <span className="mr-1.5 text-gray-500">Сервіс:</span>
          <DeliverySupplier supplier={supplier} />
        </div>
        <p>
          <span className="mr-1.5 text-gray-500">Населений пункт:</span>
          {city}
        </p>
        <p className="mb-2">
          <span className="mr-1.5 text-gray-500">Місце доставки:</span>
          {postOffice}
        </p>
        {status !== OrderStatusEnum.Rejected && status !== OrderStatusEnum.Created && (
          <Box>
            <ParcelTrackId trackId={parcelTrackId} />
          </Box>
        )}
      </Box>
    </BoxSection>
  )
}
