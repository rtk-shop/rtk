'use client'

import { useState, useEffect } from 'react'
import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
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
      <Box as="section" className="max-h-127.5 overflow-y-auto rounded-t-2xl">
        <Box className="bg-white px-4">
          <Box as="form">
            <Box className="relative py-4">
              <p className="text-center text-xl font-semibold">{t('nouns.filters')}</p>
              {isDirty && (
                <Button size="sm" className="absolute top-4 left-0" onClick={handleReset}>
                  <Icon name="common/x" className="mr-0.5" />
                  {t('verbs.clear')}
                </Button>
              )}
              <Box className="absolute top-2.5 right-1">
                <Button color="ghost" className="bg-transparent" onClick={onFiltersClose}>
                  <Icon name="common/x" className="text-2xl text-black" />
                </Button>
              </Box>
            </Box>
            <div className="mb-2.5 h-0.5 bg-gray-100" />
            <CheckboxGroup
              title={t('nouns.categories')}
              name="category"
              options={categoriesOptionsData.map(addI18)}
            />
            <PriceRange
              title={t('nouns.price')}
              min={currentRange[0]}
              max={currentRange[1]}
              onSet={handlePriceRange}
            />
            <RadioGroup name="tag" options={tagsOptionsData.map(addI18)} />
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
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}
