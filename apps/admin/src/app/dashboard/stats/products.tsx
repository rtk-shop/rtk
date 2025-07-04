import { Warehouse } from 'lucide-react'

export function Products({ count }: { count?: number }) {
  return (
    <div className="mx-1 basis-1/3 rounded-lg bg-gray-100 px-3 py-1.5 sm:mx-2 sm:rounded-2xl sm:pt-6 sm:pb-4">
      <div className="flex items-center sm:mb-2.5">
        <Warehouse strokeWidth={1.5} className="size-8 sm:size-10" />
        <span className="grow text-center text-lg font-medium sm:text-3xl">{count || '-/-'}</span>
      </div>
      <p className="hidden font-medium text-gray-600 sm:block">Единиц товара</p>
    </div>
  )
}
