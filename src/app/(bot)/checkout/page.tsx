'use client'

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { CustomerInfo } from './customer-info'
import { DeliveryInfo } from './delivery-info'
import { Preview } from './preview'
import { usePageState } from './model/usePageState'
import { useCallback } from 'react'
import { FormValues, validationSchema } from './model/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
// import { OrderSuccessModal } from './modals/order-success'

export default function Checkout() {
  const [state, dispatch] = usePageState({
    waitDataSyncing: true,
    isInfoOpen: false,
    isDeliveryOpen: false
  })

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      supplier: 'nova-poshta'
      // temp
      // name: 'User',
      // surname: 'Surname',
      // email: 'user@mail.com',
      // phone: '380777777777',
      // cityName: '_test_',
      // postOfficeName: 'test_test'
    }
  })

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values)

    // try {
    //   await createOrder({
    //     variables: { cartItems, ...values }
    //   })
    //   setOrderSuccess(true)
    // } catch (error) {
    //   console.log(error)

    //   setOrderErr(true)
    // }
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
            <Preview submitLoading={false} orderCreationErr={false} />
          </div>
        </form>
      </FormProvider>
      {/* <OrderSuccessModal open={isOrderSuccess} onClose={hanldeModalClose} /> */}
    </div>
  )
}
