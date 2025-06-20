'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@repo/ui'
import { useProcessOrderMutation } from '@/lib/api/hooks'

export function ProcessOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter()

  const [{ fetching }, processOrder] = useProcessOrderMutation()

  const handleClick = () => {
    processOrder({ id: orderId }).then((result) => {
      if (result.error) {
        let message = 'Ошибка выполнения'

        if (result.error.message.includes('already processed order')) {
          message = 'Заказ уже обрабатывается'
        }

        toast.error(message, {
          duration: 2000,
          richColors: true
        })

        return
      }

      // info: Invalidating data from a server-component
      // https://nearform.com/open-source/urql/docs/advanced/server-side-rendering/#invalidating-data-from-a-server-component
      router.refresh()

      toast.success(`Заказ №${result.data?.processOrder.orderId} принят в обработку`, {
        duration: 1500,
        richColors: true
      })
    })
  }

  return (
    <div>
      <Button loading={fetching} onClick={handleClick}>
        Принять в обработку
      </Button>
    </div>
  )
}
