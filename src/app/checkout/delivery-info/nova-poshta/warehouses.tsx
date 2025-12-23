import useSWR, { Fetcher } from 'swr'
import { useEffect, useState } from 'react'
import { usePageState } from '../../model/state'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { providerNames, warehouseTypeLocale } from '../../model/constants'
import AsyncSelect from 'react-select/async'
import type { MenuListProps, GroupBase } from 'react-select'
import type { ListRowProps } from 'react-virtualized'
import type { Warehouse } from '../../model/types'
import type { FormValues } from '../../model/validation-schema'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

type WarehousesOption = {
  label: string
  value: string
}

const cellCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 30
})

export const VirtualizedList = ({
  children
}: MenuListProps<WarehousesOption, false, GroupBase<WarehousesOption>>) => {
  const rows = children

  const recalculateRowHeight = () => {
    cellCache.clearAll()
  }

  if (!Array.isArray(rows)) {
    return <>{children}</>
  }

  const rowRenderer = ({ key, parent, index, style }: ListRowProps) => (
    <CellMeasurer cache={cellCache} key={key} columnIndex={0} rowIndex={index} parent={parent}>
      <div key={key} style={style}>
        {rows[index]}
      </div>
    </CellMeasurer>
  )

  return (
    <div style={{ height: '300px' }}>
      <AutoSizer>
        {({ width, height }) => {
          recalculateRowHeight()

          return (
            <List
              width={width}
              height={height}
              deferredMeasurementCache={cellCache}
              rowHeight={cellCache.rowHeight}
              rowCount={rows.length}
              rowRenderer={rowRenderer}
            />
          )
        }}
      </AutoSizer>
    </div>
  )
}

const fetcher: Fetcher<WarehousesOption[], string> = (url) =>
  fetch(url).then((res) =>
    res.json().then((data) =>
      data.map((w: Warehouse) => ({
        value: w.warehouse_id,
        label: w.name
      }))
    )
  )

export function Warehouses({ cityId, onSelect }: { cityId: string; onSelect(id: string): void }) {
  const t = useTranslations()
  const onErrorDrawerOpen = usePageState((state) => state.onErrorDrawerOpen)

  const { getValues, resetField } = useFormContext<FormValues>()

  const warehouseType = getValues()['np-delivery-type']

  const [selectValue, setSelectValue] = useState<WarehousesOption | null>(null)

  useEffect(() => {
    setSelectValue(null)
    resetField('postOfficeName')
  }, [cityId, resetField])

  const params = new URLSearchParams({
    provider: providerNames.novaPoshta,
    city_id: cityId,
    warehouse_type: warehouseType
  })

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_DELIVERY_API}/warehouses?${params}`,
    fetcher,
    {
      fallbackData: [],
      onError() {
        onErrorDrawerOpen(true)
      }
    }
  )

  const filterWarehouses = (inputValue: string) =>
    new Promise<WarehousesOption[]>((resolve) => {
      const res = data.filter((w) => w.label.toLowerCase().includes(inputValue.toLowerCase()))
      resolve(res)
    })

  return (
    <div className="mb-3">
      <span>{t(`Common.nouns.${warehouseTypeLocale[+warehouseType]}`)}</span>
      <AsyncSelect
        components={{ MenuList: VirtualizedList }}
        cacheOptions
        isClearable
        isLoading={isLoading}
        value={selectValue}
        onChange={(newValue, { action }) => {
          setSelectValue(newValue)
          switch (action) {
            case 'select-option':
              if (newValue) onSelect(newValue.label)
              break
            case 'clear':
              onSelect('')
              break
          }
        }}
        defaultOptions={data}
        loadOptions={filterWarehouses}
        placeholder={t('Checkout.delivery.warehousePlaceholder')}
        styles={{
          menu: ({ position, fontWeight, ...provided }) => ({
            ...provided,
            fontWeight: 500,
            position: 'static'
          })
        }}
      />
    </div>
  )
}
