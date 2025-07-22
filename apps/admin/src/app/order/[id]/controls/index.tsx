import { ProcessOrderButton } from './process'
import { OrderStatus } from '@/lib/api/graphql/types'

export function Controls({ orderId, status }: { orderId: string; status: OrderStatus }) {
  return (
    <section className="rounded-xl bg-gray-100 px-3 py-6">
      {status === OrderStatus.Created && <ProcessOrderButton orderId={orderId} />}
      {status === OrderStatus.Processed && (
        <div>
          <div>
            <h2>Other controls</h2>
          </div>
        </div>
      )}
    </section>
  )
}
