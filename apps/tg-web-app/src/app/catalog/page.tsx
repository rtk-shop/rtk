'use client'

import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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

type QueryFilters = {
  price?: PriceRangeType
  instock?: boolean
  tag?: ProductTag
  category?: CategoryType[] | CategoryType
  gender?: Gender
  sortBy: ProductFilterSortBy
}

const LIMIT_PER_PAGE = 33

export default function Catalog() {
  const [isFiltersOpen, setFiltersOpen] = useState(false)
  const [isSortMenuOpen, setSortMenuOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: 'after' | 'before', value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      if (name === 'before' && params.has('after')) {
        params.delete('after')
      }

      if (name === 'after' && params.has('before')) {
        params.delete('before')
      }

      // console.log('new params', params.toString())

      return params.toString()
    },
    [searchParams]
  )

  const clearCursorSearchParams = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('after')
    params.delete('before')

    router.push(`${pathname}?${params.toString()}`)
  }, [router, pathname, searchParams])

  const after = searchParams.get('after')
  const before = searchParams.get('before')

  if (searchParams.has('after') && searchParams.has('before')) {
    router.replace(pathname)
  }

  const [filterParams, setFilterParams] = useState<QueryFilters>({
    sortBy: ProductFilterSortBy.Default
  })

  const [result] = useProductsQuery({
    variables: {
      first: LIMIT_PER_PAGE,
      after,
      before,
      ...filterParams
    }
  })

  const { data, fetching, error } = result
  // console.log(result.data?.products.priceRange)

  const formMethods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      gender: [],
      availability: [],
      tag: null,
      priceRange: undefined,
      category: [],
      sortBy: 'DEFAULT'
    }
  })

  const { watch, handleSubmit, trigger, reset } = formMethods

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    (data) => {
      const { gender, availability, tag, priceRange, category, sortBy } = data

      let price: PriceRangeType | undefined

      if (priceRange) {
        const [gt, lt] = priceRange
        price = { gt, lt }
      }

      let instock: boolean | undefined

      if (availability.length === 1) {
        const map = { inStock: true, byOrder: false }
        instock = map[availability[0]]
      }

      const categoryData = category as unknown as CategoryType
      const tagData = tag as unknown as ProductTag
      const genderData = gender as unknown as Gender
      const sortByData = sortBy as ProductFilterSortBy

      // new filter starts pagination from the beginning
      clearCursorSearchParams()

      setFilterParams({
        price,
        instock,
        category: categoryData,
        tag: tagData,
        gender: genderData,
        sortBy: sortByData
      })
    },
    [clearCursorSearchParams]
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
    // setParams((prev) => ({ ...prev, before: null, after: data?.products.pageInfo.endCursor }))
    router.push(
      pathname + '?' + createQueryString('after', data?.products.pageInfo.endCursor || '')
    )
  }

  const handlePrevPage = () => {
    router.push(
      pathname + '?' + createQueryString('before', data?.products.pageInfo.startCursor || ''),
      {
        scroll: false
      }
    )
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
                    onNext={handleNextPage}
                    onPrev={handlePrevPage}
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
