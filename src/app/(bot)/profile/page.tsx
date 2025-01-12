import { OrderRejectModal } from './modals/reject-order'
import { Orders } from './orders'

export default function Profile() {
  const tempUserId = '1'

  return (
    <div className="h-dvh px-2 pb-12">
      <div className="flex h-full flex-col">
        <div className="mt-auto">
          <h2 className="mb-2 text-xl font-medium">Мои заказы</h2>
          <Orders userId={tempUserId} />
        </div>
      </div>
      <OrderRejectModal userId={tempUserId} />
    </div>
  )
}
