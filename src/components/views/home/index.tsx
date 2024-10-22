import { useState, useEffect } from 'react'
import { cva } from 'cva'
import { Filters } from './filters'
import { ProductList } from './product-list'
import { ListSkeleton } from './product-list/skeleton'
import { ErrorPlug } from '@/components/ui/error-plug'
import { Backdrop } from '@/components/ui/backdrop'
import { Controls } from './controls'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import type { CategoryType, ProductTag, Gender } from '@/graphql/types'
import { useProductsLazyQuery } from '@/graphql/product/_gen_/products.query'

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

const filtersBox = cva(
  'scroll-bar fixed top-0 z-50 h-full w-full max-w-80 overflow-y-auto bg-white transition-all duration-200 lg:static lg:right-0 lg:max-w-64 desktop:max-w-80',
  {
    variants: {
      isOpen: {
        true: 'right-0',
        false: '-right-full'
      }
    }
  }
)

export function HomeIndex() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0])
  const [isOpen, setOpen] = useState(false)

  const page = 1
  const numOfPage = !isNaN(Number(page)) ? Number(page) : 1

  const [getProducts, { data, error, loading }] = useProductsLazyQuery({
    onCompleted: (data) => {
      if (data?.products.priceRange) {
        const { gt, lt } = data.products.priceRange
        setPriceRange([gt, lt])
      }
    }
  })

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

    getProducts({
      variables: {
        page: numOfPage,
        price,
        instock,
        category: categoryData,
        tag: tagData,
        gender: genderData
      }
    })
  }

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)())
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  useEffect(() => {
    getProducts({
      variables: {
        page: numOfPage
      }
    })
  }, [numOfPage, getProducts])

  const handleFilterClick = (): void => {
    document.documentElement.style.position = 'fixed'
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    document.documentElement.style.position = 'static'
    setOpen(false)
  }

  const handleReset = (): void => {
    reset()
  }

  if (error) {
    console.log(error)

    if (error.message === 'invalid page') {
      // return <Redirect to={routeNames.catalog} />
      console.log(error)
    }
    return <ErrorPlug />
  }

  const totalPages = data?.products.pagination.totalPages

  return (
    <div>
      <FormProvider {...formMethods}>
        <div className="m-auto max-w-[1700px] pt-4">
          <div className="flex w-full flex-wrap px-2 lg:flex-nowrap">
            <div className={filtersBox({ isOpen })}>
              <Filters onReset={handleReset} priceRange={priceRange} />
            </div>
            <div className="w-full">
              {loading ? (
                <ListSkeleton />
              ) : (
                <div className="h-full">
                  <Controls onFilterClick={handleFilterClick} />
                  <ProductList
                    totalPages={totalPages ? totalPages : 1}
                    currentPage={isNaN(numOfPage) ? 1 : numOfPage}
                    products={data?.products.products}
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>
          </div>
          <Backdrop open={isOpen} onClick={handleDrawerClose} />
        </div>
      </FormProvider>
    </div>
  )
}
