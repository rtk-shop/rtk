import useSWR, { Fetcher } from 'swr'
import * as orderPayment from '@/lib/api/graphql/_gen_/orderPayment.query'

export type PaymentInfoResponse = {
  id: string
  receiver_name: string
  receiver_code: string
  bank: string
  iban: string
}

const fetcher: Fetcher<PaymentInfoResponse, string> = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error()

    return res.json().then((data) => data)
  })

export function usePaymentReceiverInfo() {
  return useSWR<PaymentInfoResponse>(
    `${process.env.NEXT_PUBLIC_API_HOST}/payment-receiver`,
    fetcher,
    { shouldRetryOnError: false }
  )
}
