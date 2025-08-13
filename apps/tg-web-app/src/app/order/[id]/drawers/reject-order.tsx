import { Button } from '@repo/ui'
import { Drawer } from '@/components/ui/drawer'
import { useRejectOrderMutation } from '@/lib/api/hooks'
import { usePageState } from '../state'
import { ErrorMessage } from '@repo/ui'

export function OrderRejectModal({ orderId }: { orderId: string }) {
  const isOpen = usePageState((state) => state.isRejectModalOpen)
  const setRejectModalOpen = usePageState((state) => state.setRejectModalOpen)

  const [rejectResult, rejectOrder] = useRejectOrderMutation()

  const handleConfirmClick = async () => {
    const result = await rejectOrder({ orderId })

    if (result.data && !result.error) {
      setRejectModalOpen(false)
      return
    }
  }

  const handleCancelClick = () => {
    setRejectModalOpen(false)
  }

  const { fetching, error } = rejectResult

  return (
    <Drawer open={isOpen} position="bottom" onClose={handleCancelClick}>
      <div className="rounded-t-2xl bg-white px-4 pt-7 pb-3">
        <h3 className="mb-4 text-center text-lg font-medium">Вы подтверждаете отмену заказа?</h3>
        <div className="mb-3 flex">
          <Button loading={fetching} onClick={handleConfirmClick} fullWidth>
            Подтвердить
          </Button>
          <Button
            onClick={handleCancelClick}
            fullWidth
            className="ml-2 bg-gray-200"
            color="secondary"
          >
            Отменить
          </Button>
        </div>
        <ErrorMessage show={!!error} align="center">
          <span className="text-center">Ошибка, повторите попытку позже</span>
        </ErrorMessage>
      </div>
    </Drawer>
  )
}
