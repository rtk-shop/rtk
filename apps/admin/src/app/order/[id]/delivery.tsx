import { DeliverySupplier } from '@repo/ui'

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
    <section className="basis-full rounded-xl bg-gray-100 p-4 sm:basis-1/2">
      <h2 className="mb-2 text-lg font-medium">Доставк</h2>
      <div>
        <p className="flex items-center">
          <span className="mr-1 text-gray-500">Сервис:</span>
          <DeliverySupplier supplier={supplier} />
        </p>
        <p>
          <span className="mr-1 text-gray-500">Населенный пункт:</span>
          {city}
        </p>
        <p>
          <span className="mr-1 text-gray-500">Отделение:</span>
          {postOffice}
        </p>
        <p>
          <span className="mr-1 text-gray-500">Трекинг ID:</span>
          <span>{parcelTrackId ? parcelTrackId : '—'.repeat(10)}</span>
        </p>
      </div>
    </section>
  )
}
