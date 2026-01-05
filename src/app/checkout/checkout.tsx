'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Box } from '@/components/ui/box'
import { CustomerInfo } from './customer-info'
import { DeliveryInfo } from './delivery-info'
import { Preview } from './preview'
import { FormValues, validationSchema } from './model/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useCreateOrderMutation } from '@/lib/api/hooks'
import { OrderSuccessDrawer } from './drawers/order-success'
import { OrderErrorDrawer } from './drawers/error'
import { SupplierService, OrderPaymentMethod } from '@/lib/api/graphql/types'
import { usePageState } from './model/state'
import { isDataDefined } from '@/lib/api/helpers'

export function Checkout() {
  const onSucessDrawerOpen = usePageState((state) => state.onSucessDrawerOpen)
  const onErrorDrawerOpen = usePageState((state) => state.onErrorDrawerOpen)
  const onSetNewOrderId = usePageState((state) => state.onSetNewOrderId)

  const [orderResult, createOrder] = useCreateOrderMutation()

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    shouldFocusError: false,
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      supplier: SupplierService.Novap,
      paymentMethod: OrderPaymentMethod.Online,
      'np-delivery-type': '1'
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    // delete meta form data
    const { ['np-delivery-type']: _, ...requestValues } = values

    const res = await createOrder({ ...requestValues })

    if (!isDataDefined(res.data) || res.error) {
      onErrorDrawerOpen(true, { kind: 'submit' })
      console.log(res.error)
    } else {
      onSetNewOrderId(res.data.createOrder.id)
      onSucessDrawerOpen(true)
    }
  }

  return (
    <>
      <style precedence="high">
        {`
          body {
            background-color: var(--color-gray-100);
          }
        `}
      </style>
      <FormProvider {...formMethods}>
        <Box className="px-2.5 py-5 pb-3">
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <CustomerInfo />
            <DeliveryInfo />
            <Preview submitLoading={orderResult.fetching} />
          </form>
        </Box>
      </FormProvider>
      <OrderSuccessDrawer />
      <OrderErrorDrawer />
    </>
  )
}
