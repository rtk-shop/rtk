import { Box } from '@/components/ui/box'
import { formatDate } from '@/lib/helpers'

export function OrderHeader({ orderId, createdAt }: { orderId: string; createdAt: string }) {
  return (
    <Box className="my-3">
      <h1 className="text-center text-2xl leading-6 font-medium tracking-tight">
        Замовлення №{orderId}
      </h1>
      <p className="text-center text-sm leading-none text-gray-400">
        Від {formatDate(createdAt, { dateStyle: 'long' })}
      </p>
    </Box>
  )
}
