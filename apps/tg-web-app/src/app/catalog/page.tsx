'use client'

import { useCallback, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Pagination } from '@/components/layout/pagination'
import { Controls } from './controls'
import { Filters } from './filters'
import { ProductList } from './product-list'
import { useAutoSubmit } from '@/hooks'
import { ControlsSkeleton } from './skeletons/controls'
import { SortMenu } from './sort'
import { useProductsQuery } from '@/lib/api/hooks'
import { ProductListSkeleton } from '@/components/layout/product-list-skeleton'
import { FetchError } from './plugs/fetch-err'
import type { FormValues, PriceRangeType } from './model/types'
import { ProductFilterSortBy, CategoryType, Gender, ProductTag } from '@/lib/api/graphql/types'
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryStates
} from 'nuqs'

export default function Page() {
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const [isSortMenuOpen, setSortMenuOpen] = useState(false)

  const [pagination, setPagination] = useQueryStates({
    after: parseAsString,
    before: parseAsString
  })

  const [filterParams, setFilterParams] = useState<{
    price?: PriceRangeType
  }>()

  const [filters, setFilters] = useQueryStates({
    category: parseAsArrayOf(
      parseAsStringEnum<CategoryType>(Object.values(CategoryType))
    ).withDefault([]),
    gender: parseAsArrayOf(parseAsStringEnum<Gender>(Object.values(Gender))).withDefault([]),
    tag: parseAsStringLiteral(Object.values(ProductTag)),
    instock: parseAsBoolean,
    sortBy: parseAsStringLiteral<ProductFilterSortBy>(
      Object.values(ProductFilterSortBy)
    ).withDefault(ProductFilterSortBy.Default)
  })

  const [result] = useProductsQuery({
    requestPolicy: 'network-only',
    variables: {
      first: 20,
      ...pagination,
      ...filterParams,
      ...filters
    }
  })

  const { data, fetching, error } = result
  // console.log(result.data?.products.priceRange)

  const formMethods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      availability: [],
      tag: null,
      priceRange: undefined,
      sortBy: ProductFilterSortBy.Default
    }
  })

  const { watch, handleSubmit, trigger, reset } = formMethods

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (values) => {
      const { availability, priceRange } = values

      let price: PriceRangeType | undefined

      if (priceRange) {
        const [gt, lt] = priceRange
        price = { gt, lt }
      }

      let instock: boolean | null = null

      if (availability.length === 1) {
        const map = { inStock: true, byOrder: false }
        instock = map[availability[0]]
      }

      setFilters({ ...values })

      setFilterParams({
        price
      })
    },
    [setFilters]
  )

  useAutoSubmit({
    watch,
    trigger,
    onSubmit: handleSubmit(onSubmit),
    debounceTime: 0
  })

  if (error) return <FetchError />

  const handleReset = () => {
    reset()
    handleSubmit(onSubmit)()
  }

  const handleNextPage = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    if (data?.products.pageInfo.endCursor) {
      setPagination({
        after: data.products.pageInfo.endCursor,
        before: null
      })
    }
  }

  const handlePrevPage = () => {
    if (data?.products.pageInfo.startCursor) {
      setPagination({
        before: data.products.pageInfo.startCursor,
        after: null
      })
    }
  }

  const products = data?.products.edges?.map((e) => e?.node) || []
  const priceRange = result.data?.products.priceRange

  return (
    <div className="mb-12">
      <FormProvider {...formMethods}>
        <div className="flex w-full flex-wrap px-2 lg:flex-nowrap">
          <SortMenu open={isSortMenuOpen} onSortClose={() => setSortMenuOpen(false)} />
          <Filters
            onReset={handleReset}
            open={isFiltersOpen}
            onFiltersClose={() => setFiltersOpen(false)}
            priceRange={[priceRange?.gt || 0, priceRange?.lt || 0]}
          />

          <div className="w-full">
            {fetching ? (
              <>
                <ControlsSkeleton />
                <ProductListSkeleton />
              </>
            ) : (
              <div className="h-full">
                <Controls
                  onSortClick={() => setSortMenuOpen(true)}
                  onFiltersClick={() => setFiltersOpen(true)}
                />
                <ProductList products={products} onReset={handleReset} />
                <div className="px-2 pt-2.5 pb-4">
                  <Pagination
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    hasNextPage={data?.products.pageInfo.hasNextPage}
                    hasPreviousPage={data?.products.pageInfo.hasPreviousPage}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  )
}
