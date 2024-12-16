'use client'

import { useState, useEffect } from 'react'
import { RadioGroup } from '@/components/ui/radio-group'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { PriceRange } from '@/components/ui/price-range'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import {
  type Option,
  genderOptionsData,
  availabilityOptionsData,
  tagsOptionsData,
  categoriesOptionsData
} from './model/filters-data'
import type { CategoryType, ProductTag, Gender } from '@/lib/api/graphql/types'

export type FormValues = {
  gender: Array<Lowercase<keyof typeof Gender>>
  availability: Array<'inStock' | 'byOrder'>
  tag: Lowercase<keyof typeof ProductTag> | null
  priceRange: [number, number]
  category: Array<Lowercase<keyof typeof CategoryType>>
}

export interface FiltersProps {
  priceRange: [number, number]
  onReset(): void
}

export function Filters({ priceRange, onReset }: FiltersProps) {
  const t = useTranslations('Common')

  const {
    formState: { isDirty },
    setValue
  } = useFormContext<FormValues>()

  const [currentRange, setCurrentRange] = useState(priceRange)

  useEffect(() => {
    setCurrentRange(priceRange)
  }, [priceRange])

  function addI18<T>(option: Option<T>) {
    return {
      ...option,
      label: t(option.label)
    }
  }

  const handleReset = () => {
    setCurrentRange([0, 0]) // in this case RHF set field to undefined
    onReset()
  }

  const handlePriceRange = (newRange: [number, number]) => {
    if (newRange[0] === currentRange[0] && newRange[1] === currentRange[1]) return
    setValue('priceRange', newRange, { shouldDirty: true })
  }

  return (
    <aside className="relative px-2.5 pb-5 pt-2.5">
      <form>
        <div className="flex items-center justify-between py-4">
          <p className="text-[21px] font-semibold">{t('nouns.filters')}</p>
          {isDirty && (
            <button
              onClick={handleReset}
              className="select-none rounded-lg bg-red-500 px-2 py-0.5 text-sm font-medium text-white"
            >
              {t('verbs.clear')}
            </button>
          )}
        </div>
        <div className="mb-2.5 h-0.5 bg-gray-200" />
        <CheckboxGroup
          title={t('nouns.type')}
          name="gender"
          options={genderOptionsData.map(addI18)}
        />
        <CheckboxGroup
          title={t('nouns.availability')}
          name="availability"
          options={availabilityOptionsData.map(addI18)}
        />
        <div className="px-2.5 py-2">
          <RadioGroup name="tag" options={tagsOptionsData.map(addI18)} />
        </div>
        <PriceRange
          title={t('nouns.price')}
          min={currentRange[0]}
          max={currentRange[1]}
          onSet={handlePriceRange}
        />
        <CheckboxGroup
          title={t('nouns.categories')}
          name="category"
          options={categoriesOptionsData.map(addI18)}
        />
      </form>
    </aside>
  )
}