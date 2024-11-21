import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cva } from 'cva'
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
  'relative h-20 rounded-lg border border-gray-300 before:invisible before:absolute before:left-1.5 before:top-1.5 before:size-4 before:rounded-full before:bg-lime-500 after:invisible after:absolute after:left-[11px] after:top-2 after:h-2.5 after:w-1.5 after:rotate-45 after:border-b-2 after:border-r-2 after:border-b-white after:border-r-white'
)

const peerStyles = cva(
  'peer-checked:border-green-light peer-checked:bg-green-light/20 peer-checked:before:visible peer-checked:after:visible peer-disabled:opacity-55'
)

interface DeliveryInfoProps {
  isEdit: boolean
  onEdit(): void
  onContinue(): void
  onSomeError(): void
}

export function DeliveryInfo({ isEdit, onEdit, onContinue, onSomeError }: DeliveryInfoProps) {
  const t = useTranslations()
  const { register } = useFormContext<DeliveryValues>()

  const values = useWatch({
    name: ['cityName', 'postOfficeName', 'supplier']
  })

  const supplier = values[2]

  const [animatedRef, animatedEl] = useElementSize()

  const [popularCities, setPopularCities] = useState<PopularCity[]>([])
  const [citiesMeta, setCitiesMeta] = useState({
    error: false,
    loading: true
  })

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchData = async () => {
      const resp = await fetch(process.env.NEXT_PUBLIC_DELIVERY_API + '/popular-cities', {
        signal,
        cache: 'default'
      })
      const data = await resp.json()

      setPopularCities(data)
      setCitiesMeta({
        loading: false,
        error: false
      })
    }

    fetchData().catch((error) => {
      console.warn('fetch popular_citiest:', error.message)
      setCitiesMeta((prev) => ({ ...prev, loading: false, error: true }))
      onSomeError()
    })

    return () => {
      // controller.abort()
    }
  }, [onSomeError])

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
      <StepTitle step={2} isEdit={isEdit} onEdit={onEdit} valid={isValuesValid}>
        {t('Checkout.delivery.title')}
      </StepTitle>

      <Expander open={isEdit} openHeightPx={animatedEl.height}>
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
          <p className="mb-2 mt-1 text-end text-[13px] leading-none">
            * {t('Checkout.delivery.unavailable')}
          </p>
          {/*  */}
          <ShowBlock as="nova" current={supplier}>
            <NovaPoshta
              popularCitiesLoad={citiesMeta.loading}
              popularCities={popularCities}
              onSomeError={onSomeError}
            />
          </ShowBlock>
          <ShowBlock as="ukr" current={supplier}>
            <UkrPoshta />
          </ShowBlock>
          {/*  */}
          <Button color="accept" fullWidth disabled={!isValuesValid} onClick={onContinue}>
            {t('Common.verbs.continue')}
          </Button>
        </div>
      </Expander>
    </section>
  )
}
