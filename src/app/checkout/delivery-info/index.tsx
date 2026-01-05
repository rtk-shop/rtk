import Image from 'next/image'
import useSWR, { Fetcher } from 'swr'
import { Box } from '@/components/ui/box'
import { cva } from 'cva'
import { usePageState } from '../model/state'
import { StepTitle } from '../common/step-title'
import { DynamicExpander } from '@/components/ui/dynamic-expander'
import { Callout } from '@/components/ui/callout'
import { Button } from '@/components/ui/button'
import { ShowBlock } from '../common/show-block'
import { NovaPoshta } from './nova-poshta'
import { UkrPoshta } from './ukr-poshta'
import { parse } from 'valibot'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { SupplierService } from '@/lib/api/graphql/types'
import { type DeliveryValues, deliverySchema } from '../model/validation-schema'
import type { PopularCity } from '../model/types'

const deliveryService = cva(
  'relative h-20 rounded-lg border border-gray-300 before:invisible before:absolute before:top-1.5 before:left-1.5 before:size-4 before:rounded-full before:bg-lime-500 after:invisible after:absolute after:top-2 after:left-2.75 after:h-2.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 after:border-r-white after:border-b-white'
)

const peerStyles = cva(
  'peer-checked:border-green-light peer-checked:bg-green-light/20 peer-disabled:opacity-55 peer-checked:before:visible peer-checked:after:visible'
)

const fetcher: Fetcher<PopularCity[], string> = (url) => fetch(url).then((res) => res.json())

export function DeliveryInfo() {
  const t = useTranslations()
  const { register } = useFormContext<DeliveryValues>()

  const isDeliveryOpen = usePageState((state) => state.isDeliveryOpen)
  const onDeliverySection = usePageState((state) => state.onDeliverySection)
  const closeDelivery = usePageState((state) => state.closeDelivery)
  const onErrorDrawerOpen = usePageState((state) => state.onErrorDrawerOpen)

  const values = useWatch({
    name: ['cityName', 'postOfficeName', 'supplier', 'paymentMethod']
  })

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_DELIVERY_API}/popular-cities`,
    fetcher,
    {
      fallbackData: [],
      onError() {
        onErrorDrawerOpen(true)
      }
    }
  )

  const supplier = values[2]

  let isValuesValid = false

  try {
    parse(deliverySchema, {
      cityName: values[0],
      postOfficeName: values[1],
      supplier: values[2],
      paymentMethod: values[3]
      // patronymic: values[4]
    })
    isValuesValid = true
  } catch {
    isValuesValid = false
  }

  return (
    <Box as="section" className="rounded-lg bg-white">
      <StepTitle step={2} isEdit={isDeliveryOpen} onEdit={onDeliverySection} valid={isValuesValid}>
        {t('Checkout.delivery.title')}
      </StepTitle>
      <DynamicExpander open={isDeliveryOpen}>
        <Box className="px-2.5 pb-3">
          <Box className="mb-3">
            <Callout type="info">
              <p className="text-sm leading-4 font-medium">
                {t('Checkout.callouts.deliveryPayment')}
              </p>
            </Callout>
          </Box>
          <Box as="ul" flex="row">
            <Box as="li" className="mr-2 w-full">
              <label>
                <input
                  type="radio"
                  value={SupplierService.Novap}
                  className="peer hidden"
                  {...register('supplier')}
                />
                <Box
                  className={deliveryService({
                    class: peerStyles()
                  })}
                >
                  <Box className="relative h-full">
                    <Image fill={true} src="/assets/nova_poshta.svg" alt="логотип 'Новая Почта'" />
                  </Box>
                </Box>
              </label>
            </Box>
            <Box as="li" className="w-full">
              <label>
                <input
                  disabled
                  type="radio"
                  value={SupplierService.Ukrp}
                  className="peer hidden"
                  {...register('supplier')}
                />
                <Box
                  className={deliveryService({
                    class: peerStyles()
                  })}
                >
                  <Box className="relative h-full">
                    <Image fill={true} src="/assets/ukr_poshta.svg" alt="логотип 'Укр Почта'" />
                  </Box>
                </Box>
              </label>
            </Box>
          </Box>
          <p className="mt-1 text-end text-[13px] leading-none">
            * {t('Checkout.delivery.unavailable')}
          </p>
          {/*  */}
          <ShowBlock as={SupplierService.Novap} current={supplier}>
            <NovaPoshta popularCitiesLoad={isLoading} popularCities={data} />
          </ShowBlock>
          <ShowBlock as={SupplierService.Ukrp} current={supplier}>
            <UkrPoshta />
          </ShowBlock>
          {/*  */}
          <Button color="accept" fullWidth disabled={!isValuesValid} onClick={closeDelivery}>
            {t('Common.verbs.continue')}
          </Button>
        </Box>
      </DynamicExpander>
    </Box>
  )
}
