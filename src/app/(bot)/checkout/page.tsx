'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { CustomerInfo } from './customer-info'
import { DeliveryInfo } from './delivery-info'
import { Preview } from './preview'
import { useState } from './model/useState'
import { useCallback } from 'react'
import { FormValues, validationSchema } from './model/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useCreateOrderMutation } from '@/lib/api/hooks'
import { useCartStore } from '@/providers/cart-store-provider'
import { OrderSuccessModal } from './modals/order-success'

export default function Checkout() {
  const [state, dispatch] = useState({
    waitDataSyncing: true,
    isInfoOpen: false,
    isDeliveryOpen: true,
    successOrderModalOpen: false
  })

  const [cartItems] = useCartStore((state) => state.cartItems)

  const [orderResult, createOrder] = useCreateOrderMutation()

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      supplier: 'nova',
      // temp
      name: 'User',
      surname: 'Userovich',
      phone: '998713081',
      'np-delivery-type': '1'
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    // delete meta form data
    const { ['np-delivery-type']: removedKey, ...requestValues } = values

    const res = await createOrder({
      cartItems,
      ...requestValues
    })

    if (res.error) {
      console.log(res.error)
    } else {
      console.log(res.data)
      dispatch.openSucessModal()
    }
  }

  const handleInfoEditOpen = useCallback(() => {
    dispatch.openInfo()
  }, [dispatch])

  const handleInfoChecked = () => {
    dispatch.infoChecked()
  }

  const handleDeliveryEditOpen = useCallback(() => {
    dispatch.openDelivery()
  }, [dispatch])

  const handleDeliveryChecked = () => {
    dispatch.closeDelivery()
  }

  return (
    <div className="mb-16 min-h-dvh bg-gray-100">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="px-2.5 py-5 pb-3">
            <CustomerInfo
              isEdit={state.isInfoOpen}
              onEdit={handleInfoEditOpen}
              onContinue={handleInfoChecked}
            />
            <DeliveryInfo
              isEdit={state.isDeliveryOpen}
              onEdit={handleDeliveryEditOpen}
              onContinue={handleDeliveryChecked}
            />
            <Preview
              cartItems={cartItems}
              submitLoading={orderResult.fetching}
              submitError={!!orderResult.error}
            />
          </div>
        </form>
      </FormProvider>
      <OrderSuccessModal open={state.successOrderModalOpen} />
    </div>
  )
}
