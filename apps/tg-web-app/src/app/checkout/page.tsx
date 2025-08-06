import { getCart } from '@/lib/api'
import { Checkout } from './checkout'
import { redirect, RedirectType } from 'next/navigation'
import { routeNames } from '@/lib/routes'

export default async function Page() {
  const { error, data } = await getCart()

  if (error || !data?.cartProducts.length) {
    redirect(routeNames.catalog, RedirectType.replace)
  }

  return <Checkout />
}
