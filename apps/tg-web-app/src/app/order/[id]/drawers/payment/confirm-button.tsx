import { type ReactNode } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useInitSoleProprietorPaymentMutation } from '@/lib/api/hooks'

export interface ConfirmButtonProps {
  orderId: string
  children: ReactNode
  onSucess(): void
}

export function ConfirmButton({ orderId, children, onSucess }: ConfirmButtonProps) {
  const [{ fetching }, initPayment] = useInitSoleProprietorPaymentMutation()

  const handleButtonClick = () => {
    initPayment({ orderId }).then((result) => {
      if (result.error) {
        toast.error('Сталася помилка, спробуйте пізніше', {
          duration: 2000,
          richColors: true
        })
        return
      }
      toast.success('Перевіряємо платіж', {
        duration: 2500,
        richColors: true
      })
      onSucess()
    })
  }

  return (
    <Button fullWidth color="accept" loading={fetching} onClick={handleButtonClick}>
      {children}
    </Button>
  )
}
