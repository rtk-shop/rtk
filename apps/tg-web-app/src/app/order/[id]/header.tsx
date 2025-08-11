'use client'

import { Icon } from '@/components/ui/icon'
import { Button } from '@repo/ui'
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
      <Button
        onClick={handleButtonClick}
        color="secondary"
        className="flex items-center rounded-md bg-slate-100 !py-1.5 !pr-3 !pl-2 text-sm leading-4 text-gray-800"
        startIcon={<Icon name="common/arrow" className="-rotate-90 text-[23px]" />}
      >
        Назад
      </Button>
    </div>
  )
}
