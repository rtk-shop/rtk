import { Icon } from '@/components/ui/icon'

export function Users({ count }: { count?: number }) {
  return (
    <div className="basis-1/3 rounded-lg bg-gray-100 px-3 py-1.5 sm:rounded-2xl sm:pt-6 sm:pb-4">
      <div className="flex items-center sm:mb-2.5">
        <Icon name="common/user" className="text-2xl sm:text-4xl" />
        <span className="grow text-center text-lg font-medium sm:text-3xl">{count || '-/-'}</span>
      </div>
      <p className="hidden font-medium text-gray-600 sm:block">Пользователи</p>
    </div>
  )
}
