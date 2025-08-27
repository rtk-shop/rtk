'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { CustomerInfo } from './customer-info'
import { DeliveryInfo } from './delivery-info'
import { Preview } from './preview'
import { FormValues, validationSchema } from './model/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useCreateOrderMutation } from '@/lib/api/hooks'
import { OrderSuccessModal } from './modals/order-success'
import { ErrorModal } from './modals/error'
import { SupplierService } from '@/lib/api/graphql/types'
import { usePageState } from './model/state'

export function Checkout() {
  const onSucessModal = usePageState((state) => state.onSucessModal)
  const onErrorModal = usePageState((state) => state.onErrorModal)

  const [orderResult, createOrder] = useCreateOrderMutation()

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    shouldFocusError: false,
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      supplier: SupplierService.Novap,
      'np-delivery-type': '1'
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    // delete meta form data
    const { ['np-delivery-type']: removedKey, ...requestValues } = values

    const res = await createOrder({ ...requestValues })

    if (res.error) {
      onErrorModal(true, { kind: 'submit' })
      console.log(res.error)
    } else {
      onSucessModal(true)
    }
  }

  return (
    <div className="bg-gray-100">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="px-2.5 py-5 pb-3">
            <CustomerInfo />
            <DeliveryInfo />
            <Preview submitLoading={orderResult.fetching} />
          </div>
        </form>
      </FormProvider>
      <OrderSuccessModal />
      <ErrorModal />
    </div>
  )
}
