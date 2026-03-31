'use client'

import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { useUserDoneOrdersCount } from '@/lib/api/hooks'
import ContentLoader from 'react-content-loader'

export function DoneOrdersCountSkeleton() {
  return (
    <ContentLoader
      className="h-full"
      backgroundColor="#e5e7eb"
      foregroundColor="#f3f4f6"
      width="100%"
    >
      <rect x="0" y="0" width="100%" rx="6" ry="6" height="15" />
      <rect x="0" y="54%" width="50%" rx="6" ry="6" height="15" />
    </ContentLoader>
  )
}

export function DoneOrdersCount() {
  const [{ data, fetching, error }] = useUserDoneOrdersCount()

  if (fetching) return <DoneOrdersCountSkeleton />

  if (error)
    return (
      <Box flex="row" justify="center" className="text-3xl text-red-600">
        <Icon name="action/warning" />
      </Box>
    )

  return (
    <Box flex="row" justify="center" className="text-3xl">
      <span>{data?.userDoneOrdersCount.count}</span>
    </Box>
  )
}
