import { useEffect, useState } from 'react'
import AsyncSelect from 'react-select/async'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import type { MenuListProps, GroupBase } from 'react-select'
import type { ListRowProps } from 'react-virtualized'

interface WarehousesProps {
  cityId: string
  onSelect(id: string): void
}

type WarehousesOption = {
  label: string
  value: string
}

type Warehouses = {
  id: string
  description: string
}

const cellCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 30
})

const VirtualizedList = ({
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

export function Warehouses({ cityId, onSelect }: WarehousesProps) {
  const [warehouses, setWarehouses] = useState<WarehousesOption[]>([])
  const [selectValue, setSelectValue] = useState<WarehousesOption | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    setLoading(true)
    setWarehouses([])
    setSelectValue(null)

    fetch('/api/getWarehouses', {
      signal,
      method: 'POST',
      body: JSON.stringify({
        city_id: cityId,
        provider: 'nova_poshta'
      })
    })
      .then(async (resp) => {
        const data: Warehouses[] = await resp.json()
        // console.log(data)

        if (resp.status === 200) {
          const options: WarehousesOption[] = data.map((w) => ({
            value: w.id,
            label: w.description
          }))
          setWarehouses(options)
          setLoading(false)
        } else {
          throw new Error('failed request')
        }
      })
      .catch((error) => {
        setLoading(false)
        console.warn('ERROR:', error)
      })

    return () => {
      controller.abort()
    }
  }, [cityId])

  const loadWarehouses = (inputValue: string) =>
    new Promise<WarehousesOption[]>((resolve) => {
      setTimeout(() => {
        const c = warehouses.filter((w) => w.label.toLowerCase().includes(inputValue.toLowerCase()))
        resolve(c)
      })
    })

  const handleSelectChange = (value: string) => {
    onSelect(value)
  }

  return (
    <div>
      <span>Отделения</span>
      <AsyncSelect
        components={{ MenuList: VirtualizedList }}
        cacheOptions
        isClearable
        isLoading={loading}
        value={selectValue}
        onChange={(newValue, { action }) => {
          // console.log(newValue, action)
          setSelectValue(newValue)
          if (action === 'select-option') {
            if (newValue) handleSelectChange(newValue.label)
            return
          }
          if (action === 'clear') handleSelectChange('')
        }}
        defaultOptions={warehouses}
        loadOptions={loadWarehouses}
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
