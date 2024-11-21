import { useEffect, useState, useMemo } from 'react'
import AsyncSelect from 'react-select/async'
import { Warehouses } from './warehouses'
import { useFormContext } from 'react-hook-form'
import { components, InputProps, type OptionsOrGroups } from 'react-select'
import { RadioGroup, type RadioOption } from '@/components/ui/radio-group'
import { ScrollMask } from '@/components/ui/scroll-mask'
import { useTranslations } from 'next-intl'
import { pupularCitiesNames, novaDeliveryTypeOptions, providerNames } from '../../model/constants'
import type { PopularCity } from '../../model/types'
import type { FormValues } from '../../model/validation-schema'
import { useDebouncedCallback } from 'use-debounce'
import { searchSettlements } from '../../model/api'

type CityOption = {
  label: string
  value: string
}

const SelectInput = (props: InputProps<CityOption, false>) => {
  // Disable autocomplete on field
  // https://stackoverflow.com/a/30976223/15604836
  return (
    <components.Input aria-activedescendant={undefined} {...props} autoComplete="one-time-code" />
  )
}

export function NovaPoshta({
  popularCitiesLoad,
  popularCities,
  onSomeError
}: {
  popularCities: PopularCity[]
  popularCitiesLoad: boolean
  onSomeError(): void
}) {
  const t = useTranslations()
  const [cityId, setCityId] = useState('')
  const [selectValue, setSelectValue] = useState<CityOption | null>(null)

  const { setValue } = useFormContext<FormValues>()

  const memCitiesOptions: CityOption[] = useMemo(
    () =>
      popularCities.map((city) => ({
        label: city.city_name,
        value: city.nova_poshta_id
      })),
    [popularCities]
  )

  useEffect(() => {
    setCityId(selectValue ? selectValue.value : '')
  }, [selectValue])

  const fetchOptions = (inputValue: string, callback: (options: CityOption[]) => void) => {
    return new Promise<CityOption[]>((resolve) => {
      const matches = memCitiesOptions.filter((c) =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
      )

      resolve(matches)
    }).then((options) => {
      if (options.length) {
        callback(options)
        return
      }

      searchSettlements(inputValue)
        .then((data) => {
          const settlements: CityOption[] = data.map((v) => ({
            label: v.name,
            value: v.settlement_id
          }))

          callback(settlements)
        })
        .catch((err) => {
          console.log('WALLE', err)
          // todo handle
          callback([])
        })
    })
  }

  const debouncedLoadOptions = useDebouncedCallback(fetchOptions, 750)

  const getOptionsAsync = (inputValue: string, callback: (options: CityOption[]) => void) => {
    debouncedLoadOptions(inputValue, callback)
  }

  const handleSelectChange = (cityId: string) => {
    setCityId(cityId)
    setValue('cityName', cityId)
  }

  const handleWarehouseChange = (warehouseName: string) => {
    setValue('postOfficeName', warehouseName)
  }

  const handleCityQuikSet = (city: CityOption) => {
    setSelectValue(city)
    setCityId(city.value)
    setValue('cityName', city.label)
  }

  const selectedCities = pupularCitiesNames.map((cityName) => {
    const city = popularCities.find((city) =>
      city.city_name.toLocaleLowerCase().includes(cityName.toLocaleLowerCase())
    )

    return {
      label: city ? city.city_name : '',
      value: city ? city.nova_poshta_id : '',
      baseLabel: cityName
    }
  })

  const radioOptions = novaDeliveryTypeOptions.map((option: RadioOption) => ({
    ...option,
    label: t(`Common.nouns.${option.label}`)
  }))

  return (
    <div>
      <div className="mb-3">
        <p>Свайпни</p>
        <ScrollMask>
          <RadioGroup direction="row" name="np-delivery-type" options={radioOptions} />
        </ScrollMask>
      </div>
      <div className="w-full">
        <p className="my-1.5 leading-none">{t('Common.nouns.city')}</p>
        <AsyncSelect
          cacheOptions
          loadOptions={getOptionsAsync}
          instanceId={'rsl1'}
          isDisabled={popularCitiesLoad}
          value={selectValue}
          isClearable
          onChange={(newValue, { action }) => {
            setSelectValue(newValue)
            switch (action) {
              case 'select-option':
                if (newValue) handleSelectChange(newValue.label)
                break
              case 'clear':
                handleSelectChange('')
                break
            }
          }}
          components={{ Input: SelectInput }}
          defaultOptions={memCitiesOptions}
          placeholder={t('Checkout.delivery.cityPlaceholder')}
          styles={{
            menu: ({ position, ...provided }) => ({
              ...provided,
              position: 'static'
            }),
            menuList: (provided) => ({
              ...provided,
              '::-webkit-scrollbar': {
                width: '4px',
                height: '0px'
              },
              '::-webkit-scrollbar-track': {
                background: '#f1f1f1'
              },
              '::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '15px'
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: '#555'
              }
            })
          }}
        />
      </div>
      {/*  */}
      <ul className="my-1 flex justify-between">
        {selectedCities.map(({ baseLabel, value, label }) => (
          <li
            key={baseLabel}
            onClick={() => handleCityQuikSet({ label, value })}
            className="text-[14px] font-medium text-blue-700"
          >
            <span>{baseLabel}</span>
          </li>
        ))}
      </ul>
      {cityId && (
        <Warehouses cityId={cityId} onSelect={handleWarehouseChange} onSomeError={onSomeError} />
      )}
    </div>
  )
}
