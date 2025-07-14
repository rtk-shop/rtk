'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { Order } from './types'
import { TablePagination } from './pagination'
import { routeNames } from '@/lib/routes'

export function OrderTable() {
  const router = useRouter()
  const [first, setFirst] = useState(10)
  const [cursor, setCursor] = useState<{ before?: string; after?: string }>({
    before: undefined,
    after: undefined
  })

  const [result] = useOrders({
    variables: {
      first,
      ...cursor
    }
  })

  result.data?.orders.pageInfo

  const data = useMemo(() => {
    return result.data?.orders.edges.map((edge) => edge.node) || []
  }, [result.data?.orders])

  const table = useReactTable({
    columns,
    data,
    // state: {
    //   pagination
    // },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((result.data?.orders.totalCount as number) / first)
  })

  const handlePageSizeChange = (size: number) => {
    setFirst(size)
  }

  const handleNextPage = () => {
    if (result.data?.orders.pageInfo.hasNextPage) {
      const newAfter = result.data.orders.pageInfo.endCursor as string

      setCursor({
        before: undefined,
        after: newAfter
      })
    }
  }

  const handlePrevPage = () => {
    if (result.data?.orders.pageInfo.hasNextPage) {
      const newBefore = result.data.orders.pageInfo.startCursor as string

      setCursor({
        before: newBefore,
        after: undefined
      })
    }
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
      />
    </div>
  )
}
