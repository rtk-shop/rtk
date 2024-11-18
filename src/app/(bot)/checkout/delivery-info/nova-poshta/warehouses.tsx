import { useEffect, useState } from 'react'
import { providerNames } from '../../model/constants'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import AsyncSelect from 'react-select/async'
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

export function Warehouses({
  cityId,
  warehouseType,
  onSelect
}: {
  cityId: string
  warehouseType: string
  onSelect(id: string): void
}) {
  const [warehouses, setWarehouses] = useState<WarehousesOption[]>([])
  const [selectValue, setSelectValue] = useState<WarehousesOption | null>(null)

  const [warehousesMeta, setWarehousesMeta] = useState<{
    error: boolean
    loading: boolean
  }>({
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
      // todo handle this case
      setWarehousesMeta((prev) => ({ ...prev, loading: false, error: true }))
    })
  }, [cityId, warehouseType])

  const filterWarehouses = (inputValue: string) =>
    new Promise<WarehousesOption[]>((resolve) => {
      const res = warehouses.filter((w) => w.label.toLowerCase().includes(inputValue.toLowerCase()))
      resolve(res)
    })

  return (
    <div className="mb-3">
      <span>Отделения</span>
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
        placeholder={'Укажите отделение'}
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
