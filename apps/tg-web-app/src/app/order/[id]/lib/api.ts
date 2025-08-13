import useSWR, { Fetcher } from 'swr'

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

export function usePaymentInfo(pause: boolean) {
  return useSWR<PaymentInfoResponse>(
    pause ? `${process.env.NEXT_PUBLIC_API_HOST}/payment-receiver` : null,
    fetcher,
    { shouldRetryOnError: false }
  )
}
