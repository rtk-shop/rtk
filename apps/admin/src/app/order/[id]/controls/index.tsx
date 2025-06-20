import { ProcessOrderButton } from './process'

export function Controls({ orderId }: { orderId: string }) {
  return (
    <section>
      <h2>Contorls</h2>
      <ProcessOrderButton orderId={orderId} />
    </section>
  )
}
