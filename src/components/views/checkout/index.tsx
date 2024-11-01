import { useState, useEffect, useCallback } from 'react'
import { PageLoader } from '@/components/page-loader'
import { CustomerInfo } from './customer-info'
import { DeliveryInfo } from './delivery-info'
import { Preview } from './preview'
import { OrderSuccessModal } from './modals/order-success'
import { useRouter } from 'next/router'
import { routeNames } from '@/lib/constants'
import { usePageState } from './model/usePageState'
import { FormValues, validationSchema } from './model/validation-schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useCartStore } from '@/providers/cart-store-provider'

import styles from './styles.module.scss'
import { useCreateOrderMutation } from '@/graphql/order/_gen_/create.mutation'

export function CheckoutIndex() {
  const router = useRouter()

  const [state, dispatch] = usePageState({
    waitDataSyncing: true,
    isInfoOpen: false,
    isDeliveryOpen: false
  })

  const [isOrderSuccess, setOrderSuccess] = useState(false)
  const [orderErr, setOrderErr] = useState(false)

  const cartItems = useCartStore((state) => state.cartItems)

  const [createOrder, { loading }] = useCreateOrderMutation()

  useEffect(() => {
    // console.log(cartItems)

    if (!cartItems.length) {
      // router.back()
    } else {
      dispatch.dataSynced()
    }
  }, [router, dispatch, cartItems])

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    resolver: valibotResolver(validationSchema),
    defaultValues: {
      supplier: 'nova-poshta'
      // temp
      // name: 'Vlad',
      // surname: 'Shevliakov',
      // email: 'vlad@mail.com',
      // phone: '380777777777',
      // cityName: '_test_',
      // postOfficeName: 'test_test'
    }
  })

  const handleInfoEditOpen = useCallback(() => {
    dispatch.openInfo()
  }, [dispatch])

  const handleDeliveryEditOpen = useCallback(() => {
    dispatch.openDelivery()
  }, [dispatch])

  const handleInfoChecked = () => {
    dispatch.infoChecked()
  }

  const handleDeliveryChecked = () => {
    dispatch.closeDelivery()
  }

  const handleSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values)

    try {
      await createOrder({
        variables: { cartItems, ...values }
      })
      setOrderSuccess(true)
    } catch (error) {
      console.log(error)

      setOrderErr(true)
    }
  }

  const hanldeModalClose = () => {
    router.replace(routeNames.root)
  }

  if (state.waitDataSyncing) {
    return <PageLoader />
  }

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className={styles.pageForm}>
            <div className={styles.formContent}>
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
            </div>
            <div className={styles.preview}>
              <Preview submitLoading={loading} orderCreationErr={orderErr} />
            </div>
          </div>
        </form>
      </FormProvider>
      <OrderSuccessModal open={isOrderSuccess} onClose={hanldeModalClose} />
    </div>
  )
}
