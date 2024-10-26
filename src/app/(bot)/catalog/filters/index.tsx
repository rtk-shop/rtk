'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import { CheckBoxGroup } from '@/components/ui/checkbox-group'
import { PriceRange } from '@/components/ui/price-range'
import useTranslation from 'next-translate/useTranslation'
import fieldProps, { FilterItem } from './fliters-data'
import { useFormContext } from 'react-hook-form'

import type { CategoryType, ProductTag, Gender } from '@/graphql/types'

export type FormValues = {
  gender: Array<Lowercase<keyof typeof Gender>>
  availability: Array<'inStock' | 'byOrder'>
  tag: Lowercase<keyof typeof ProductTag> | null
  priceRange: [number, number]
  category: Array<Lowercase<keyof typeof CategoryType>>
}

import styles from './styles.module.scss'

interface FiltersProps {
  priceRange: [number, number]
  onReset(): void
}

export function Filters({ priceRange, onReset }: FiltersProps) {
  const { t } = useTranslation('catalog')

  // const t = (s: string) => s

  const { gender, availability, tags, categories } = fieldProps

  const {
    formState: { isDirty },
    setValue
  } = useFormContext<FormValues>()

  const [currentRange, setCurrentRange] = useState(priceRange)

  useEffect(() => {
    setCurrentRange(priceRange)
  }, [priceRange])

  const addI18 = (option: FilterItem) => ({
    ...option,
    label: t(option.label)
  })

  const handleReset = () => {
    setCurrentRange([0, 0]) // in this case RHF set field to undefined
    onReset()
  }

  const handlePriceRange = (newRange: [number, number]) => {
    if (newRange[0] === currentRange[0] && newRange[1] === currentRange[1]) return
    setValue('priceRange', newRange, { shouldDirty: true })
  }

  const genderOptions = gender.options.map(addI18)
  const availabilityOptions = availability.options.map(addI18)
  const tagsOptions = tags.options.map(addI18)
  const categoriesOptions = categories.options.map(addI18)

  return (
    <aside className="relative px-2.5 pb-5 pt-2.5">
      <form>
        <div className="flex items-center justify-between py-4">
          <p className="text-[21px] font-semibold">{t('filters.title')}</p>
          {isDirty && (
            <Button color="danger" onClick={handleReset} className="">
              {t('filters.clear')}
            </Button>
          )}
        </div>
        <div className="mb-2.5 h-0.5 bg-gray-200" />
        <CheckBoxGroup title={t('filters.name.type')} name="gender" options={genderOptions} />
        <CheckBoxGroup
          name="availability"
          title={t('filters.name.availability')}
          options={availabilityOptions}
        />
        <div className={styles.tagSectionWrapper}>
          <RadioGroup name="tag" options={tagsOptions} />
        </div>
        <PriceRange
          min={currentRange[0]}
          max={currentRange[1]}
          onSet={handlePriceRange}
          title={t('filters.name.price')}
        />
        <CheckBoxGroup
          title={t('filters.name.category')}
          name="category"
          options={categoriesOptions}
        />
      </form>
    </aside>
  )
}
