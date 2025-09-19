import { formatDate } from '@repo/utils'

export function OrderHeader({ orderId, createdAt }: { orderId: string; createdAt: string }) {
  return (
    <div className="mt-2 mb-5 flex items-center justify-center">
      <div className="font-medium">
        <h1 className="text-2xl">Замовлення №{orderId}</h1>
        <p className="text-center text-sm leading-none text-gray-500">
          Від {formatDate(createdAt, { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </div>
    </div>
  )
}
