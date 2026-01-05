'use client'

import { useMemo, useState } from 'react'
import { Box } from '@/components/ui/box'
import { Pagination } from './pagination'
import { OrdersList } from './list'
import { useTranslations } from 'next-intl'
import { useUserOrdersQuery } from '@/lib/api/hooks'

type Cursor = {
  after?: string | null
  before?: string | null
}

export function Orders() {
  const t = useTranslations('Profile')

  const [cursors, setCursors] = useState<Cursor>({
    after: null,
    before: null
  })

  const [{ data, fetching, error }] = useUserOrdersQuery({
    variables: {
      first: 7,
      ...cursors
    }
  })

  const orders = useMemo(
    () => data?.userOrders.edges?.map((e) => e?.node) || [],
    [data?.userOrders.edges]
  )

  const pageInfo = data?.userOrders.pageInfo

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      setCursors((prev) => ({
        ...prev,
        before: null,
        after: pageInfo.endCursor
      }))
    }
  }

  const handlePrevPage = () => {
    if (pageInfo?.hasPreviousPage && pageInfo?.startCursor) {
      setCursors((prev) => ({
        ...prev,
        before: pageInfo.startCursor,
        after: null
      }))
    }
  }

  return (
    <Box as="section" className="h-full">
      <Box flex="row" align="center" justify="between" className="mb-4">
        <h2 className="text-xl font-medium">{t('myorders')}</h2>
        <Pagination
          pageInfo={data?.userOrders.pageInfo}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Box>
      <OrdersList fetching={fetching} error={error} orders={orders} />
    </Box>
  )
}
