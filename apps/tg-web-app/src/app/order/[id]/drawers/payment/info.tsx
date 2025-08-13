import { Button, Loader } from '@repo/ui'
import { cva } from 'cva'
import { usePageState } from '../../lib/state'
import { usePaymentInfo } from '../../lib/api'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { formatPrice } from '@repo/utils'
import { Icon } from '@/components/ui/icon'

const paymentTitle = cva('leading-none font-medium text-gray-400')

export function PaymentInfo({
  orderId,
  orderPrice,
  onClose
}: {
  orderId: string
  orderPrice: number
  onClose(): void
}) {
  const isOpen = usePageState((state) => state.isPaymentModalOpen)

  const { data, error, isLoading } = usePaymentInfo(isOpen)

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader color="secondary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Icon name="action/warning" className="m-auto mb-3 block text-[69px]" />
        <p className="text-lg font-medium text-gray-500">Сталася помилка, спробуйте пізніше</p>
        <Button fullWidth className="mt-auto" onClick={onClose}>
          Згорнути
        </Button>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Icon name="action/warning" className="m-auto mb-3 block text-[69px]" />
        <p className="text-center text-lg font-medium text-gray-500">
          Сталася помилка, платіжні дані невідомі, спробуйте пізніше
        </p>
        <Button fullWidth className="mt-auto" onClick={onClose}>
          Згорнути
        </Button>
      </div>
    )
  }

  const viewData: Array<{
    title: string
    info: string
  }> = [
    {
      title: 'Найменування отримувача',
      info: data.receiver_name
    },
    {
      title: 'Код отримувача',
      info: data.receiver_code
    },
    {
      title: 'Рахунок отримувача IBAN',
      info: data.iban
    },
    {
      title: 'Назва банку',
      info: data.bank
    },
    {
      title: 'Призначення платежу',
      info: `Оплата за замовлення №${orderId}`
    }
  ]

  return (
    <div>
      <h3 className="mb-4 text-center text-xl font-medium">Оплата за реквізитами</h3>
      <ul>
        {viewData.map(({ title, info }, index) => (
          <li key={index} className="mb-1.5">
            <p className={paymentTitle()}>{title}</p>
            <div className="flex items-center">
              <p className="font-medium">
                {title.includes('IBAN') && 'UA'}
                {info}
              </p>
              <CopyToClipboard what={info} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mb-5">
        <p className={paymentTitle()}>Сума до сплати</p>
        <div className="flex items-center">
          <p className="font-medium">{formatPrice(orderPrice)} грн.</p>
          <CopyToClipboard what={orderPrice.toString()} />
        </div>
      </div>
      <Button fullWidth onClick={onClose}>
        Згорнути
      </Button>
    </div>
  )
}
