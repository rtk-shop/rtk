import { useState } from 'react'
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
import { type DeliveryValues, deliverySchema } from '../model/validation-schema'
import type { PopularCity } from '../model/types'

interface DeliveryInfoProps {
  isEdit: boolean
  onEdit(): void
  onContinue(): void
}

const deliveryService = cva(
  'relative h-20 rounded-lg border border-gray-300 before:invisible before:absolute before:left-1.5 before:top-1.5 before:size-4 before:rounded-full before:bg-lime-500 after:invisible after:absolute after:left-[11px] after:top-2 after:h-2.5 after:w-1.5 after:rotate-45 after:border-b-2 after:border-r-2 after:border-b-white after:border-r-white'
)

const peerStyles = cva(
  'peer-checked:border-green-light peer-checked:bg-green-light/20 peer-checked:before:visible peer-checked:after:visible peer-disabled:opacity-55'
)

export function DeliveryInfo({ isEdit, onEdit, onContinue }: DeliveryInfoProps) {
  const { register } = useFormContext<DeliveryValues>()

  const values = useWatch({
    name: ['cityName', 'postOfficeName', 'supplier']
  })

  const supplier = values[2]

  // const [deliveryService, setDeliveryService] = useState<'nova' | 'ukr'>('nova')

  const [animatedRef, animatedEl] = useElementSize()

  const [popularCities, setPopularCities] = useState<PopularCity[]>([])
  const [citieLoading, setCitieLoading] = useState(true)
  const [areasError, setAreasError] = useState(false)

  // useEffect(() => {
  //   const controller = new AbortController()
  //   const { signal } = controller

  //   fetch('/api/getPopularCities', { signal })
  //     .then(async (resp) => {
  //       const data = await resp.json()
  //       // console.log(data)

  //       if (resp.status === 200) {
  //         setPopularCities(data)
  //         setCitieLoading(false)
  //       } else {
  //         throw new Error(data.error)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('ERROR:', error.message)

  //       setAreasError(true)
  //       setCitieLoading(false)
  //     })

  //   return () => {
  //     controller.abort()
  //   }
  // }, [])

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
    // console.log('error', error)
    isValuesValid = false
  }

  return (
    <section className="rounded-lg bg-white">
      <StepTitle step={2} isEdit={isEdit} onEdit={onEdit} valid={isValuesValid}>
        Способ доставки
      </StepTitle>

      <Expander open={isEdit} openHeightPx={animatedEl.height}>
        <div ref={animatedRef} className="px-2.5 pb-2.5">
          <ul className="flex">
            <li className="mr-2 w-full">
              <label className="">
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
              <label className="">
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
          <p className="mb-4 mt-1 text-end text-[13px] leading-none">* поки що недоступно</p>
          {/*  */}
          <ShowBlock as="nova" current={supplier}>
            <NovaPoshta cities={popularCities} />
          </ShowBlock>
          <ShowBlock as="ukr" current={supplier}>
            <UkrPoshta />
          </ShowBlock>
          {/*  */}
          <Button color="accept" fullWidth disabled={!isValuesValid} onClick={onContinue}>
            Продолжить
          </Button>
        </div>
      </Expander>
    </section>
  )
}
