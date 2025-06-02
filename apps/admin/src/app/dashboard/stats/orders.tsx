import { Icon } from '@/components/ui/icon'

export function Orders() {
  return (
    <div className="mr-2.5 basis-1/2 rounded-2xl bg-gray-100 px-8 pt-6 pb-4">
      <div className="mb-2.5 flex items-center">
        <Icon name="common/box-taped" className="text-4xl" />
        <span className="grow text-center text-3xl font-medium">{1}</span>
      </div>
      <p className="font-medium text-gray-600">Исполнено ордеров</p>
    </div>
  )
}
