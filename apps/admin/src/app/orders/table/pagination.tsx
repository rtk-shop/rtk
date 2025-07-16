import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/shadcn/button'
import { ChevronRightIcon, ChevronsLeft } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shadcn/select'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageInfo?: {
    hasNextPage: boolean
    startCursor?: string | null
    endCursor?: string | null
    hasPreviousPage: boolean
  }
  onPageSizeChange(size: number): void
  onNextPage(): void
  onPrevPage(): void
  onFirstPage(): void
  onLastPage?(): void
}

export function TablePagination<TData>({
  table,
  pageInfo,
  onPageSizeChange,
  onNextPage,
  onPrevPage,
  onFirstPage
}: DataTablePaginationProps<TData>) {
  return (
    <section className="flex justify-end py-3 pr-4">
      <div className="mr-10 flex items-center">
        <p className="mr-4 hidden text-sm font-medium sm:block">Строк на страницу</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            onPageSizeChange(+value)
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[15, 20, 25].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        className="mr-1.5 size-8 cursor-pointer"
        onClick={onFirstPage}
        disabled={!pageInfo?.hasPreviousPage}
      >
        <ChevronsLeft />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="mr-2.5 size-8 cursor-pointer"
        onClick={onPrevPage}
        disabled={!pageInfo?.hasPreviousPage}
      >
        <ChevronRightIcon className="rotate-180" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="size-8 cursor-pointer"
        onClick={onNextPage}
        disabled={!pageInfo?.hasNextPage}
      >
        <ChevronRightIcon />
      </Button>
      <Button variant="outline" className="ml-1.5 size-8" disabled>
        <ChevronsLeft className="rotate-180" />
      </Button>
    </section>
  )
}
