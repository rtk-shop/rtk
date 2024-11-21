import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { usePageState } from '../../model/state'
import { useWatch } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { providerNames, warehouseTypeLocale } from '../../model/constants'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import type { MenuListProps, GroupBase } from 'react-select'
import type { ListRowProps } from 'react-virtualized'
import type { Warehouse } from '../../model/types'

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

export interface WarehousesProps {
  cityId: string
  onSelect(id: string): void
}

export function Warehouses({ cityId, onSelect }: WarehousesProps) {
  const t = useTranslations()
  const onErrorModal = usePageState((state) => state.onErrorModal)

  const values = useWatch({
    name: ['np-delivery-type']
  })

  const warehouseType = values[0]

  const [warehouses, setWarehouses] = useState<WarehousesOption[]>([])
  const [selectValue, setSelectValue] = useState<WarehousesOption | null>(null)

  const [warehousesMeta, setWarehousesMeta] = useState({
    error: false,
    loading: true
  })

  useEffect(() => {
    const params = new URLSearchParams({
      provider: providerNames.novaPoshta,
      city_id: cityId,
      warehouse_type: warehouseType
    })

    const fetchData = async () => {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_DELIVERY_API}/warehouses?${params}`)
      const data = await resp.json()

      const options = data.map((w: Warehouse) => ({
        value: w.warehouse_id,
        label: w.name
      }))

      setWarehouses(options)
      setWarehousesMeta((prev) => ({ ...prev, loading: false }))
    }

    fetchData().catch((error) => {
      setWarehousesMeta((prev) => ({ ...prev, loading: false, error: true }))
      onErrorModal(true)
    })
  }, [cityId, warehouseType, onErrorModal])

  const filterWarehouses = (inputValue: string) =>
    new Promise<WarehousesOption[]>((resolve) => {
      const res = warehouses.filter((w) => w.label.toLowerCase().includes(inputValue.toLowerCase()))
      resolve(res)
    })

  return (
    <div className="mb-3">
      <span>{t(`Common.nouns.${warehouseTypeLocale[+warehouseType]}`)}</span>
      <AsyncSelect
        components={{ MenuList: VirtualizedList }}
        cacheOptions
        isClearable
        isLoading={warehousesMeta.loading}
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
        defaultOptions={warehouses}
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
