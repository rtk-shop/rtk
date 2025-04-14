'use client'

import { useState, useEffect } from 'react'
import { Drawer } from '@/components/ui/drawer'
import { RadioGroup } from '@/components/ui/radio-group'
import { CheckboxGroup } from '@/components/ui/checkbox-group'
import { PriceRange } from '@/components/ui/price-range'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { countFiltersDirtyFields } from './model/helpers'
import {
  type Option,
  genderOptionsData,
  availabilityOptionsData,
  tagsOptionsData,
  categoriesOptionsData
} from './model/form-data'
import { FormValues } from './model/types'

export interface FiltersProps {
  open: boolean
  priceRange: [number, number]
  onReset(): void
  onFiltersClose(): void
}

export function Filters({ open, priceRange, onReset, onFiltersClose }: FiltersProps) {
  const t = useTranslations('Common')

  const {
    formState: { dirtyFields },
    setValue
    // reset
  } = useFormContext<FormValues>()

  const isDirty = countFiltersDirtyFields(dirtyFields) > 0

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
    <Drawer open={open} position="bottom" onClose={onFiltersClose}>
      <section className="max-h-[470px] overflow-y-auto rounded-t-2xl">
        <div className="bg-white px-4">
          <form>
            <div className="flex items-center justify-between py-4">
              <p className="text-[21px] font-semibold">{t('nouns.filters')}</p>
              {isDirty && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg bg-red-500 px-2 py-0.5 text-sm font-medium text-white select-none"
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
        </div>
      </section>
    </Drawer>
  )
}
