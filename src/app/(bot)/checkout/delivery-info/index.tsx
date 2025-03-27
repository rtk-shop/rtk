import Image from 'next/image'
import useSWR, { Fetcher } from 'swr'
import { cva } from 'cva'
import { usePageState } from '../model/state'
import { StepTitle } from '../common/step-title'
import { Expander } from '../common/expander'
import { Button } from '@/components/ui/button'
import { useElementSize } from '@/hooks'
import { ShowBlock } from '../common/show-block'
import { NovaPoshta } from './nova-poshta'
import { UkrPoshta } from './ukr-poshta'
import { parse } from 'valibot'
import { useFormContext, useWatch } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { type DeliveryValues, deliverySchema } from '../model/validation-schema'
import type { PopularCity } from '../model/types'

const deliveryService = cva(
  'relative h-20 rounded-lg border border-gray-300 before:invisible before:absolute before:top-1.5 before:left-1.5 before:size-4 before:rounded-full before:bg-lime-500 after:invisible after:absolute after:top-2 after:left-[11px] after:h-2.5 after:w-1.5 after:rotate-45 after:border-r-2 after:border-b-2 after:border-r-white after:border-b-white'
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
  const onErrorModal = usePageState((state) => state.onErrorModal)

  const values = useWatch({
    name: ['cityName', 'postOfficeName', 'supplier']
  })

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_DELIVERY_API}/popular-cities`,
    fetcher,
    {
      fallbackData: [],
      onError() {
        onErrorModal(true)
      }
    }
  )

  const supplier = values[2]

  const [animatedRef, animatedEl] = useElementSize()

  let isValuesValid = false

  try {
    parse(deliverySchema, {
      cityName: values[0],
      postOfficeName: values[1],
      supplier: values[2]
      // patronymic: values[3]
    })
    isValuesValid = true
  } catch (error) {
    isValuesValid = false
  }

  return (
    <section className="rounded-lg bg-white">
      <StepTitle step={2} isEdit={isDeliveryOpen} onEdit={onDeliverySection} valid={isValuesValid}>
        {t('Checkout.delivery.title')}
      </StepTitle>

      <Expander open={isDeliveryOpen} openHeightPx={animatedEl.height}>
        <div ref={animatedRef} className="px-2.5 pb-3">
          <ul className="flex">
            <li className="mr-2 w-full">
              <label>
                <input
                  type="radio"
                  value="nova"
                  className="peer hidden"
                  {...register('supplier')}
                />
                <div
                  className={deliveryService({
                    class: peerStyles()
                  })}
                >
                  <div className="relative h-full">
                    <Image fill={true} src="/assets/nova_poshta.svg" alt="логотип 'Новая Почта'" />
                  </div>
                </div>
              </label>
            </li>
            <li className="w-full">
              <label>
                <input
                  disabled
                  type="radio"
                  value="ukr"
                  className="peer hidden"
                  {...register('supplier')}
                />
                <div
                  className={deliveryService({
                    class: peerStyles()
                  })}
                >
                  <div className="relative h-full">
                    <Image fill={true} src="/assets/ukr_poshta.svg" alt="логотип 'Укр Почта'" />
                  </div>
                </div>
              </label>
            </li>
          </ul>
          <p className="mt-1 mb-2 text-end text-[13px] leading-none">
            * {t('Checkout.delivery.unavailable')}
          </p>
          {/*  */}
          <ShowBlock as="nova" current={supplier}>
            <NovaPoshta popularCitiesLoad={isLoading} popularCities={data} />
          </ShowBlock>
          <ShowBlock as="ukr" current={supplier}>
            <UkrPoshta />
          </ShowBlock>
          {/*  */}
          <Button color="accept" fullWidth disabled={!isValuesValid} onClick={closeDelivery}>
            {t('Common.verbs.continue')}
          </Button>
        </div>
      </Expander>
    </section>
  )
}
