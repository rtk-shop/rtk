'use client'

import { Box } from '@/components/ui/box'
import { usePageState } from '../lib/state'
import { Button } from '@/components/ui/button'
import { OrderStatus } from '@/lib/api/graphql/types'

const statusesForReject = [OrderStatus.Created, OrderStatus.Processed]

export function RejectOrderButton({ orderStatus }: { orderStatus: OrderStatus }) {
  const setRejectDrawerOpen = usePageState((state) => state.setRejectDrawerOpen)

  return (
    <Box>
      {statusesForReject.includes(orderStatus) && (
        <Box className="py-3">
          <Button
            color="secondary"
            fullWidth
            onClick={() => setRejectDrawerOpen(true)}
            className="bg-gray-200 pt-3 pb-3"
          >
            Отменить заказ
          </Button>
        </Box>
      )}
    </Box>
  )
}
