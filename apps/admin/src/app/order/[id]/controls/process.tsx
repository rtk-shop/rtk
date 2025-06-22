import { toast } from 'sonner'
import { Button } from '@repo/ui'
import { useProcessOrderMutation } from '@/lib/api/hooks'

export function ProcessOrderButton({ orderId }: { orderId: string }) {
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

      toast.success(`Заказ №${result.data?.processOrder.orderId} принят в обработку`, {
        duration: 1500,
        richColors: true
      })
    })
  }

  return (
    <div className="flex justify-center">
      <Button fullWidth loading={fetching} className="max-w-60" onClick={handleClick}>
        Принять в обработку
      </Button>
    </div>
  )
}
