'use client'

import { Box } from '@/components/ui/box'
import { useEffect, useState } from 'react'
import { DoneOrdersCountSkeleton } from './done-orders-count'
import { Icon } from '@/components/ui/icon'

// Temporary solution
export function Offer() {
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setFetching(false)
    }, 1000)

    return () => {
      clearTimeout(t)
    }
  }, [])

  if (fetching) return <DoneOrdersCountSkeleton />

  return (
    <Box flex="row" justify="center" align="center">
      <Icon name="profile/gift" className="mr-1 text-[33px] text-gray-500" />
      <Box className="text-sm leading-none tracking-tighter text-gray-600">
        <p>Покищо</p>
        <p>немає пропозицій</p>
      </Box>
    </Box>
  )
}
