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
        <Box flex="row" justify="center" className="py-3">
          <Button color="secondary" onClick={() => setRejectDrawerOpen(true)} className="pt-2 pb-2">
            Отменить заказ
          </Button>
        </Box>
      )}
    </Box>
  )
}
