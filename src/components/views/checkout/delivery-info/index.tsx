import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { StepTitle } from '../common/step-title'
import { Button } from '@/components/ui/button'
import { ErrorModal } from '../modals/error'
import { useElementSize } from '@/hooks'
import { ShowBlock } from '../common/show-block'
import { NovaPoshta } from './nova-poshta'
import { UkrPoshta } from './ukr-poshta'
import { parse } from 'valibot'
import { useFormContext, useWatch } from 'react-hook-form'
import { type DeliveryValues, deliverySchema } from '../model/validation-schema'
import type { PopularCity } from '../model/types'

import styles from './styles.module.scss'

interface DeliveryInfoProps {
  isEdit: boolean
  onEdit(): void
  onContinue(): void
}

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

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    fetch('/api/getPopularCities', { signal })
      .then(async (resp) => {
        const data = await resp.json()
        // console.log(data)

        if (resp.status === 200) {
          setPopularCities(data)
          setCitieLoading(false)
        } else {
          throw new Error(data.error)
        }
      })
      .catch((error) => {
        console.log('ERROR:', error.message)

        setAreasError(true)
        setCitieLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  let isValuesValid = false

  try {
    parse(deliverySchema, {
      cityName: values[0],
      postOfficeName: values[1],
      supplier: values[2]
    })
    isValuesValid = true
  } catch (error) {
    isValuesValid = false
  }

  return (
    <section className={styles.container}>
      <StepTitle step={2} isEdit={isEdit} onEdit={onEdit} valid={isValuesValid}>
        Способ доставки
      </StepTitle>
      <div
        className={clsx({
          [styles.animated]: true,
          [styles.animatedOpen]: isEdit
        })}
        style={{
          height: isEdit ? animatedEl.height : 0
        }}
      >
        <div ref={animatedRef} className={styles.animatedInner}>
          <ul className={styles.servicesList}>
            <li className={styles.servicesItem}>
              <label className={styles.serviceLabel}>
                <input
                  type="radio"
                  value="nova-poshta"
                  className={clsx('hide', styles.deliveryInput)}
                  {...register('supplier')}
                />
                <div className={styles.deliveryService}>
                  <div className={styles.serviceImageWrapper}>
                    <Image fill={true} src="/assets/nova_poshta.svg" alt="логотип 'Новая Почта'" />
                  </div>
                </div>
              </label>
            </li>
            {/* <li className={styles.servicesItem}>
              <label className={styles.serviceLabel}>
                <input
                  type="radio"
                  disabled
                  value="ukr-poshta"
                  className={clsx('hide', styles.deliveryInput)}
                  {...register('supplier')}
                />
                <div className={styles.deliveryService}>
                  <div className={styles.serviceImageWrapper}>
                    <Image fill={true} src="/assets/ukr_poshta.svg" alt="логотип 'Укр Почта'" />
                  </div>
                </div>
              </label>
            </li> */}
          </ul>
          {/*  */}
          <ShowBlock as="nova-poshta" current={supplier}>
            <NovaPoshta cities={popularCities} />
          </ShowBlock>
          <ShowBlock as="ukr-poshta" current={supplier}>
            <UkrPoshta />
          </ShowBlock>
          {/*  */}
          <Button
            color="accept"
            fullWidth
            disabled={!isValuesValid}
            onClick={onContinue}
            className={styles.continueButton}
          >
            Продолжить
          </Button>
        </div>
      </div>
      <ErrorModal open={false} />
    </section>
  )
}
