import { Icon } from '@/components/ui/icon'

export function Products({ count }: { count?: number }) {
  return (
    <div className="mx-1 basis-1/3 rounded-lg bg-gray-100 px-3 py-1.5 sm:mx-2 sm:rounded-2xl sm:pt-6 sm:pb-4">
      <div className="flex items-center sm:mb-2.5">
        <Icon name="common/warehouse" className="mr-1 text-2xl sm:text-4xl" />
        <span className="grow text-center text-lg font-medium sm:text-3xl">{count || '-/-'}</span>
      </div>
      <p className="hidden font-medium text-gray-600 sm:block">Единиц товара</p>
    </div>
  )
}
