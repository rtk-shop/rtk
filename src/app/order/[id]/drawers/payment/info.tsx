import { Box } from '@/components/ui/box'
import { Loader } from '@/components/ui/loader'
import { cva } from 'cva'
import { Button } from '@/components/ui/button'
import { usePaymentReceiverInfo } from '../../lib/api'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { isDataDefined } from '@/lib/api/helpers'
import { Icon } from '@/components/ui/icon'
import { Callout } from '@/components/ui/callout'
import { ConfirmButton } from './confirm-button'
import type { paymentDrawer } from '../../lib/state'
import { PaymentPurpose } from '@/lib/api/graphql/types'
import { FormatPrice } from '@/components/ui/format-price'

export interface PaymentInfoProps {
  mode: paymentDrawer['mode']
  type: paymentDrawer['type']
  orderId: string
  price: number
  deliveryCost: number
  onClose(): void
}

const paymentTitle = cva('leading-none font-medium text-gray-400')

export default function PaymentInfo({
  mode,
  type,
  orderId,
  price,
  deliveryCost,
  onClose
}: PaymentInfoProps) {
  const { data, error, isLoading } = usePaymentReceiverInfo()

  if (isLoading) {
    return (
      <Box flex="row" align="center" justify="center" className="h-full">
        <Loader color="secondary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box flex="col" align="center" justify="center" className="h-full">
        <Icon name="action/warning" className="m-auto mb-3 block text-[69px]" />
        <p className="text-lg font-medium text-gray-500">Сталася помилка, спробуйте пізніше</p>
        <Button fullWidth className="mt-auto" onClick={onClose}>
          Згорнути
        </Button>
      </Box>
    )
  }

  if (!isDataDefined(data)) {
    return (
      <Box flex="col" align="center" justify="center" className="h-full">
        <Icon name="action/warning" className="m-auto mb-3 block text-[69px]" />
        <p className="text-center text-lg font-medium text-gray-500">
          Сталася помилка, платіжні дані невідомі, спробуйте пізніше
        </p>
        <Button fullWidth className="mt-auto" onClick={onClose}>
          Згорнути
        </Button>
      </Box>
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
      info:
        type === PaymentPurpose.DeliveryAndOrder
          ? `Оплата за замовлення №${orderId}`
          : `Оплата за доставку замовлення №${orderId}`
    }
  ]

  let totalSumm = deliveryCost + price

  if (type === PaymentPurpose.Delivery) {
    totalSumm = deliveryCost
  }

  return (
    <Box>
      <h3 className="mb-4 text-center text-xl font-medium">Оплата за реквізитами</h3>
      <Box as="ul">
        {viewData.map(({ title, info }, index) => (
          <Box as="li" key={index} className="mb-1.5">
            <p className={paymentTitle()}>{title}</p>
            <Box flex="row" align="center">
              <p className="font-medium">
                {title.includes('IBAN') && 'UA'}
                {info}
              </p>
              <CopyToClipboard what={info} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box className="mb-4">
        <p className={paymentTitle()}>
          Сума до сплати&nbsp;
          {type === PaymentPurpose.DeliveryAndOrder && (
            <span className="text-lime-600">
              +<FormatPrice price={deliveryCost} currency="грн" /> доставка
            </span>
          )}
        </p>
        <Box flex="row" align="center">
          <FormatPrice price={totalSumm} currency="грн." />
          <CopyToClipboard what={totalSumm.toString()} />
        </Box>
      </Box>
      <Box className="mb-5">
        <Callout type="info">
          <Box className="text-sm leading-4 font-medium">
            {mode === 'payment' && (
              <p>
                Після того як Ви сплатили за реквізитами, повідомте про це нас, натиснувши на кнопку
                «<span className="text-green-600">Платіж надіслано</span>»
              </p>
            )}
            <p className="mt-1">Ми перевіримо платіж як можна швидше!</p>
          </Box>
        </Callout>
      </Box>
      <Box flex="row" justify="between">
        {mode === 'payment' && (
          <ConfirmButton orderId={orderId} onSucess={onClose}>
            Платіж надіслано
          </ConfirmButton>
        )}
        <Button fullWidth={mode === 'reminder'} onClick={onClose}>
          Згорнути
        </Button>
      </Box>
    </Box>
  )
}
