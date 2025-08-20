'use client'

import { Icon } from '@/components/ui/icon'
import { IconButton } from '@/components/ui/icon-button'
import { formatDate } from '@repo/utils'
import { useRouter } from 'next/navigation'

export function OrderHeader({ orderId, createdAt }: { orderId: string; createdAt: string }) {
  const router = useRouter()

  const handleButtonClick = () => {
    router.back()
  }

  return (
    <div className="mt-2 mb-5 flex items-center justify-between">
      <div className="font-medium">
        <h1 className="text-xl">Заказ №{orderId}</h1>
        <p className="text-sm leading-none text-gray-400">
          Від {formatDate(createdAt, { day: 'numeric', month: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <IconButton
        onClick={handleButtonClick}
        className="mr-2 !rounded-lg !bg-black !p-2.5 !text-sm text-white"
      >
        <Icon name="common/xmark" />
      </IconButton>
    </div>
  )
}
