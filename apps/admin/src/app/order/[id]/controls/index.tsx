import { ProcessOrderButton } from './process'
import type { OrderStatus } from '@/types/order'

export function Controls({ orderId, status }: { orderId: string; status: OrderStatus }) {
  return (
    <section className="rounded-xl bg-gray-100 px-3 py-6">
      {status === 'CREATED' && <ProcessOrderButton orderId={orderId} />}
      {status === 'PROCESSED' && (
        <div>
          <div>
            <h2>Other controls</h2>
          </div>
        </div>
      )}
    </section>
  )
}
