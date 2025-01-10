import { Orders } from './orders'

export default function Profile() {
  return (
    <div className="h-dvh px-2 pb-12">
      <div className="flex h-full flex-col">
        <div className="mt-auto">
          <h2 className="mb-2 text-xl font-medium">Мои заказы</h2>
          <Orders />
        </div>
      </div>
    </div>
  )
}
