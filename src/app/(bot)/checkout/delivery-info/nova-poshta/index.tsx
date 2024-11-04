import { useEffect, useState, useMemo } from 'react'
import { Warehouses } from './warehouses'
import AsyncSelect from 'react-select/async'
import { components, InputProps } from 'react-select'
import { RadioGroup } from '@/components/ui/radio-group'
import { pupularCities, novaDeliveryTypeOptions } from '../data'
import type { PopularCity } from '../../model/types'
import type { FormValues } from '../../model/validation-schema'

import { useFormContext } from 'react-hook-form'

interface NovaPoshtaProps {
  cities: PopularCity[]
}

type CityOption = {
  label: string
  value: string
}

const SelectInput = (props: InputProps<CityOption, false>) => {
  // Disable autocomplete on field
  // https://stackoverflow.com/a/30976223/15604836
  return <components.Input {...props} autoComplete="chrome-off" />
}

export function NovaPoshta({ cities }: NovaPoshtaProps) {
  const [selectValue, setSelectValue] = useState<CityOption | null>(null)

  const { setValue } = useFormContext<FormValues>()

  const [cityId, setCityId] = useState<string>('')

  const memCitiesOptions: CityOption[] = useMemo(
    () =>
      cities.map((city) => ({
        label: city.city_name,
        value: city.nova_poshta_id
      })),
    [cities]
  )

  useEffect(() => {
    setCityId(selectValue ? selectValue.value : '')
  }, [selectValue])

  const promiseOptions = (inputValue: string) =>
    new Promise<Array<CityOption>>((resolve) => {
      setTimeout(() => {
        const c = cities
          .map((city) => ({
            label: city.city_name,
            value: city.nova_poshta_id
          }))
          .filter((c) => c.label.toLowerCase().includes(inputValue.toLowerCase()))

        resolve(c)
      }, 3000)
    })

  const handleSelectChange = (cityId: string) => {
    setCityId(cityId)
    setValue('cityName', cityId)
  }

  const handleWarehouseChange = (warehouse: string) => {
    setValue('postOfficeName', warehouse)
  }

  const handleCityQuikSet = (city: CityOption) => {
    setSelectValue(city)
    setCityId(city.value)
    setValue('cityName', city.label)
  }

  const selectedCities = pupularCities.map((baseCity) => {
    const city = cities.find((city) =>
      city.city_name.toLocaleLowerCase().includes(baseCity.toLocaleLowerCase())
    )

    return {
      label: city ? city.city_name : '',
      value: city ? city.nova_poshta_id : '',
      baseLabel: baseCity
    }
  })

  // font-size: 15px;
  //   color: #6a6a6a; // dark #fff
  //   font-weight: 500;
  //   padding-left: 7px;
  //   margin-bottom: 7px;

  return (
    <div>
      <div className="overflow-x-auto">
        <RadioGroup asRow name="_np-delivery-type" options={novaDeliveryTypeOptions} />
      </div>
      <div className="w-full">
        <p className="my-1.5 leading-none">Город</p>
        <AsyncSelect
          cacheOptions
          value={selectValue}
          isClearable
          onChange={(newValue, { action }) => {
            setSelectValue(newValue)
            if (action === 'select-option' || action === 'clear') {
              if (newValue) {
                handleSelectChange(newValue.value)
              } else {
                handleSelectChange('')
              }
            }
          }}
          components={{ Input: SelectInput }}
          defaultOptions={memCitiesOptions}
          loadOptions={promiseOptions}
          placeholder={'Укажите город'}
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
      {cityId && <Warehouses cityId={cityId} onSelect={handleWarehouseChange} />}
    </div>
  )
}
