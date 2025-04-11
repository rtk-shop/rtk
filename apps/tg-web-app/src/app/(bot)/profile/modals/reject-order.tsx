'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'
import { Drawer } from '@/components/ui/drawer'
import { useRejectOrderMutation } from '@/lib/api/hooks'
import { usePageState } from '../model/page-state'
import { ErrorMessage } from '@repo/ui'

export function OrderRejectModal() {
  const [hasErr, setHasErr] = useState(false)

  const isOpen = usePageState((state) => state.isRejectOrderModalOpen)
  const currentOrderId = usePageState((state) => state.currentOrderId)
  const clearCurrentOrderId = usePageState((state) => state.clearCurrentOrderId)
  const openRejectModal = usePageState((state) => state.onRejectOrderModal)

  const [rejectResult, rejectOrder] = useRejectOrderMutation()

  const handleConfirmClick = async () => {
    if (!currentOrderId) return

    const result = await rejectOrder({
      orderId: currentOrderId
    })

    if (result.data && !result.error) {
      openRejectModal(false)
      clearCurrentOrderId()
    } else {
      setHasErr(true)
    }
  }

  const handleCancelClick = () => {
    openRejectModal(false)
    setHasErr(false)
    clearCurrentOrderId()
  }

  const { fetching } = rejectResult

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
        <ErrorMessage show={hasErr} align="center">
          <span className="text-center">Ошибка, повторите попытку позже</span>
        </ErrorMessage>
      </div>
    </Drawer>
  )
}
