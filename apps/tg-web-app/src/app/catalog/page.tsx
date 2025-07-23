'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [controls, setControls] = useState({
    isFiltersOpen: false,
    isSortMenuOpen: false
  })

  const [filterParams, setFilterParams] = useState<{
    price?: PriceRangeType
  }>()

  const [filters, setFilters] = useQueryStates({
    after: parseAsString,
    before: parseAsString,
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

  const queryVariables = useMemo(
    () => ({
      first: 20,
      ...filterParams,
      ...filters
    }),
    [filters, filterParams]
  )

  const [result] = useProductsQuery({
    requestPolicy: 'cache-and-network',
    variables: queryVariables
  })

  const { data, fetching, error } = result

  const products = useMemo(
    () => data?.products.edges?.map((e) => e?.node) || [],
    [data?.products.edges]
  )

  const priceRange = useMemo(() => data?.products.priceRange, [data?.products.priceRange])
  const pageInfo = useMemo(() => data?.products.pageInfo, [data?.products.pageInfo])

  const formMethods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      availability: [],
      category: [],
      gender: [],
      tag: null,
      priceRange: undefined,
      sortBy: ProductFilterSortBy.Default
    }
  })

  const { watch, handleSubmit, trigger, reset, setValue } = formMethods

  useEffect(() => {
    const updates = [
      { key: 'tag', value: filters.tag },
      { key: 'sortBy', value: filters.sortBy },
      { key: 'category', value: filters.category },
      { key: 'gender', value: filters.gender }
    ] as const

    updates.forEach(({ key, value }) => {
      setValue(key, value, { shouldDirty: true })
    })

    // if (filters.instock !== null && filters.instock !== undefined) {
    //   const availability = filters.instock ? ['inStock'] : ['byOrder']
    //   setValue('availability', availability, { shouldDirty: true })
    // } else {
    //   setValue('availability', [], { shouldDirty: true })
    // }
  }, [filters, setValue])

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (values) => {
      const { availability, priceRange, ...restFilters } = values

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

      setFilters({ ...restFilters, instock, after: null, before: null })

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
    debounceTime: 100
  })

  const handleNextPage = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    if (pageInfo?.endCursor) {
      setFilters((prev) => ({
        ...prev,
        after: pageInfo.endCursor,
        before: null
      }))
    }
  }, [pageInfo?.endCursor, setFilters])

  const handlePrevPage = useCallback(() => {
    if (pageInfo?.startCursor) {
      setFilters((prev) => ({
        ...prev,
        before: pageInfo.startCursor,
        after: null
      }))
    }
  }, [pageInfo?.startCursor, setFilters])

  const handleReset = useCallback(() => {
    reset()
    setTimeout(() => {
      handleSubmit(onSubmit)()
    }, 0)
  }, [reset, handleSubmit, onSubmit])

  if (error) return <FetchError />

  return (
    <div className="mb-12">
      <FormProvider {...formMethods}>
        <div className="flex w-full flex-wrap px-2 lg:flex-nowrap">
          <SortMenu
            open={controls.isSortMenuOpen}
            onSortClose={() =>
              setControls((prev) => ({
                ...prev,
                isSortMenuOpen: false
              }))
            }
          />
          <Filters
            onReset={handleReset}
            open={controls.isFiltersOpen}
            onFiltersClose={() =>
              setControls((prev) => ({
                ...prev,
                isFiltersOpen: false
              }))
            }
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
                  onSortClick={() => setControls({ isSortMenuOpen: true, isFiltersOpen: false })}
                  onFiltersClick={() => setControls({ isFiltersOpen: true, isSortMenuOpen: false })}
                />
                <ProductList products={products} onReset={handleReset} />
                <div className="px-2 pt-2.5 pb-4">
                  <Pagination
                    onNextPage={handleNextPage}
                    onPrevPage={handlePrevPage}
                    hasNextPage={pageInfo?.hasNextPage}
                    hasPreviousPage={pageInfo?.hasPreviousPage}
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
