'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
// import { orderStatus } from '@/lib/constants'

// {
//   created: 'CREATED',
//   processed: 'PROCESSED',
//   sent: 'SENT',

//   done: 'DONE',
//   rejected: 'REJECTED',
//   returned: 'RETURNED'
// }

export function StatusFilter() {
  const [filter, setFilter] = useState('all')

  const handleChange = (value: string) => {
    setFilter(value)
    console.log('-->', value)
  }

  return (
    <Tabs value={filter} onValueChange={handleChange} className="mb-6">
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="all" className="relative">
          Все
        </TabsTrigger>
        <TabsTrigger value="active" className="relative">
          Активные
        </TabsTrigger>
        <TabsTrigger value="inactive" className="relative">
          Не активные
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
