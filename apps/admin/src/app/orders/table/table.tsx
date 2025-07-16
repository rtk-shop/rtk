'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
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

export function OrderTable() {
  const router = useRouter()

  const [pagination, setPagination] = useQueryStates({
    first: parseAsInteger.withDefault(15),
    after: parseAsString,
    before: parseAsString
  })

  const [result] = useOrders({
    variables: {
      ...pagination
    }
  })

  result.data?.orders.pageInfo

  const data = useMemo(() => {
    return result.data?.orders.edges.map((edge) => edge.node) || []
  }, [result.data?.orders])

  const table = useReactTable({
    columns,
    data,
    state: {
      pagination: {
        pageSize: pagination.first,
        pageIndex: 0
      }
    },
    getCoreRowModel: getCoreRowModel(),
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
