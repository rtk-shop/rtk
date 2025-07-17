'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates
} from 'nuqs'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { columns } from './columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/shadcn/table'
import { useOrders } from '@/lib/api/hooks'
import type { Order } from './types'
import { TablePagination } from './pagination'
import { routeNames } from '@/lib/routes'
import { TableToolbar } from './toolbar'

import { OrderStatus } from '@/lib/api/graphql/types'

export function OrderTable() {
  const router = useRouter()

  const [pagination, setPagination] = useQueryStates({
    first: parseAsInteger.withDefault(15),
    after: parseAsString,
    before: parseAsString
  })

  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsArrayOf(parseAsStringEnum<OrderStatus>(Object.values(OrderStatus))).withDefault([])
  )

  const ordersFilter = useMemo(
    () => ({
      status: statusFilter.length > 0 ? statusFilter : null
    }),
    [statusFilter]
  )

  const [result] = useOrders({
    variables: {
      ...pagination,
      ...ordersFilter
    }
  })

  const data = useMemo(() => {
    return result.data?.orders.edges.map((edge) => edge.node) || []
  }, [result.data?.orders])

  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const filters: ColumnFiltersState = []

    if (statusFilter.length > 0) {
      filters.push({ id: 'status', value: statusFilter })
    }

    return filters
  }, [statusFilter])

  // Кастомный обработчик изменения фильтров таблицы
  const handleColumnFiltersChange = (updaterOrValue: unknown) => {
    const newFilters =
      typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters) : updaterOrValue

    // Синхронизируем изменения обратно в URL
    for (const filter of newFilters) {
      switch (filter.id) {
        case 'status':
          setStatusFilter(filter.value || [])
          break
      }
    }

    // Проверяем удаленные фильтры
    const activeFilterIds = new Set(newFilters.map((f: any) => f.id))
    if (!activeFilterIds.has('status') && statusFilter.length > 0) {
      setStatusFilter([])
    }
  }

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      pagination: {
        pageSize: pagination.first,
        pageIndex: 0
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    onColumnFiltersChange: handleColumnFiltersChange,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualPagination: true,
    pageCount: Math.ceil((result.data?.orders.totalCount as number) / pagination.first)
  })

  const handlePageSizeChange = (size: number) => {
    setPagination({
      first: size
    })
  }

  const handleNextPage = () => {
    if (result.data?.orders.pageInfo.hasNextPage) {
      const newAfter = result.data.orders.pageInfo.endCursor as string

      setPagination({
        before: null,
        after: newAfter
      })
    }
  }

  const handlePrevPage = () => {
    if (result.data?.orders.pageInfo.hasPreviousPage) {
      const newBefore = result.data.orders.pageInfo.startCursor as string

      setPagination({
        before: newBefore,
        after: null
      })
    }
  }

  const handleFirstPage = () => {
    setPagination({
      before: null,
      after: null
    })
  }

  const handleOrderClick = (orderId: string) => {
    router.push(routeNames.order + orderId)
  }

  return (
    <div>
      <h2 className="mb-2">История заказов</h2>
      <TableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="cursor-pointer"
                  onClick={() => handleOrderClick(row.getValue('id'))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Нет данных.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        table={table}
        onPageSizeChange={handlePageSizeChange}
        pageInfo={result.data?.orders.pageInfo}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        onFirstPage={handleFirstPage}
      />
    </div>
  )
}
