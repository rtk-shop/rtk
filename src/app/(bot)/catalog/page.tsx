'use client'

import { useState, useEffect, useCallback } from 'react'
import { Filters } from './filters'
import { ProductList } from './product-list'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import type { CategoryType, ProductTag, Gender } from '@/lib/api/graphql/types'
import { useQuery } from 'urql'
import {
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables
} from '@/lib/api/graphql/_gen_/products.query'
import { Pagination } from '@/components/layout/pagination'
import { Controls } from './controls'
import { ControlsSkeleton } from './skeletons/controls'
import { ListSkeleton } from './skeletons/list'

import { FetchError } from './plugs/fetch-err'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PriceRangeType = {
  gt: number
  lt: number
}

export type FormValues = {
  gender: Array<Lowercase<keyof typeof Gender>>
  availability: Array<'inStock' | 'byOrder'>
  tag: Lowercase<keyof typeof ProductTag> | null
  priceRange: [number, number]
  category: Array<Lowercase<keyof typeof CategoryType>>
}

interface Params {
  price?: PriceRangeType
  instock?: boolean
  tag?: ProductTag
  category?: CategoryType
  gender?: Gender
}

export default function Catalog() {
  const [isFiltersOpen, setFiltersOpen] = useState(false)

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

  const clearCursorSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('after')
    params.delete('before')

    router.push(`${pathname}?${params.toString()}`)
  }

  const after = searchParams.get('after')
  const before = searchParams.get('before')

  if (searchParams.has('after') && searchParams.has('before')) {
    router.replace(pathname)
  }

  const [filterParams, setFilterParams] = useState<Params>()

  const [result] = useQuery<ProductsQuery, ProductsQueryVariables>({
    query: ProductsDocument,
    // requestPolicy: 'network-only',
    variables: {
      first: 33,
      after,
      before,
      ...filterParams
    }
  })

  const { data, fetching, error } = result
  // console.log(result.data?.productsV2.priceRange)

  const formMethods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      gender: [],
      availability: [],
      tag: null,
      priceRange: undefined,
      category: []
    }
  })

  const { watch, handleSubmit, reset } = formMethods

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('-- API --', data)

    const { gender, availability, tag, priceRange, category } = data

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

    // new filter starts pagination from the beginning
    clearCursorSearchParams()

    setFilterParams({
      price,
      instock,
      category: categoryData,
      tag: tagData,
      gender: genderData
    })
  }

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)())
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  if (error) return <FetchError />

  const handleReset = () => {
    reset()
  }

  const handleNextPage = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    // setParams((prev) => ({ ...prev, before: null, after: data?.productsV2.pageInfo.endCursor }))
    router.push(
      pathname + '?' + createQueryString('after', data?.productsV2.pageInfo.endCursor || '')
    )
  }

  const handlePrevPage = () => {
    router.push(
      pathname + '?' + createQueryString('before', data?.productsV2.pageInfo.startCursor || ''),
      {
        scroll: false
      }
    )
  }

  const products = data?.productsV2.edges?.map((e) => e?.node) || []
  const priceRange = result.data?.productsV2.priceRange

  return (
    <div className="mb-12">
      <FormProvider {...formMethods}>
        <div className="flex w-full flex-wrap px-2 lg:flex-nowrap">
          <Filters
            open={isFiltersOpen}
            onReset={handleReset}
            onFiltersClose={() => setFiltersOpen(false)}
            priceRange={[priceRange?.gt || 0, priceRange?.lt || 0]}
          />
          <div className="w-full">
            {fetching ? (
              <>
                <ControlsSkeleton />
                <ListSkeleton />
              </>
            ) : (
              <div className="h-full">
                <Controls onFiltersClick={() => setFiltersOpen(true)} />
                <ProductList products={products} onReset={handleReset} />
                <div className="px-2 pb-4 pt-2.5">
                  <Pagination
                    onNext={handleNextPage}
                    onPrev={handlePrevPage}
                    hasNextPage={data?.productsV2.pageInfo.hasNextPage}
                    hasPreviousPage={data?.productsV2.pageInfo.hasPreviousPage}
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
