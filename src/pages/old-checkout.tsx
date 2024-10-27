import { ReactElement } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { NextPageWithLayout } from './_app'
import { CheckoutIndex } from '@/components/views/checkout'

const Checkout: NextPageWithLayout = () => {
  return <CheckoutIndex />
}

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Checkout
