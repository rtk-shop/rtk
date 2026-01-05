import { Box } from '@/components/ui/box'
import { formatDate } from '@/lib/helpers'

export function OrderHeader({ orderId, createdAt }: { orderId: string; createdAt: string }) {
  return (
    <Box flex="row" align="center" justify="center" className="mt-2 mb-5">
      <Box className="font-medium">
        <h1 className="text-2xl">Замовлення №{orderId}</h1>
        <p className="text-center text-sm leading-none text-gray-500">
          Від {formatDate(createdAt, { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </Box>
    </Box>
  )
}
