'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { useRejectOrderMutation } from '@/lib/api/hooks'
import { usePageState } from '../lib/state'
import { ErrorMessage } from '@repo/ui'

export function OrderRejectModal({ orderId }: { orderId: string }) {
  const router = useRouter()
  const isRejectDrawerOpen = usePageState((state) => state.isRejectDrawerOpen)
  const setRejectDrawerOpen = usePageState((state) => state.setRejectDrawerOpen)

  const [rejectResult, rejectOrder] = useRejectOrderMutation()

  const handleConfirmClick = async () => {
    const result = await rejectOrder({ orderId })

    if (result.data && !result.error) {
      setRejectDrawerOpen(false)
      router.refresh()
      return
    }
  }

  const handleCancelClick = () => {
    setRejectDrawerOpen(false)
  }

  const { fetching, error } = rejectResult

  return (
    <Drawer open={isRejectDrawerOpen} position="bottom" onClose={handleCancelClick}>
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
            Згорнути
          </Button>
        </div>
        <ErrorMessage show={!!error} align="center">
          <span className="text-center">Ошибка, повторите попытку позже</span>
        </ErrorMessage>
      </div>
    </Drawer>
  )
}
