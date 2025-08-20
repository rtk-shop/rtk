import { DeliverySupplier } from '@repo/ui'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'

export function Delivery({
  city,
  postOffice,
  supplier,
  parcelTrackId
}: {
  city: string
  postOffice: string
  supplier: string
  parcelTrackId?: string | null
}) {
  return (
    <section className="mb-4 rounded-xl bg-white px-3 py-2 font-medium shadow-sm">
      <h2 className="mb-2 text-lg">Информация о доставке</h2>
      <div className="text-sm">
        <p className="flex items-center">
          <span className="mr-1.5 text-gray-500">Сервис:</span>
          <DeliverySupplier supplier={supplier} />
        </p>
        <p>
          <span className="mr-1.5 text-gray-500">Населенный пункт:</span>
          {city}
        </p>
        <p className="mb-2">
          <span className="mr-1.5 text-gray-500">Отделение:</span>
          {postOffice}
        </p>
        <div className="flex items-center">
          <span className="mr-1.5 text-gray-500">Трекинг ID:</span>
          {parcelTrackId ? parcelTrackId : '-'.repeat(24)}
          {parcelTrackId && <CopyToClipboard what={parcelTrackId} />}
        </div>
      </div>
    </section>
  )
}
