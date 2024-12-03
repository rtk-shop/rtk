'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Properties } from './properties'
import { Delivery } from './delivery'
import { Loader } from '@/components/ui/loader'

interface InfoProps {
  gender: string
  description: string
  category: string
  dimensions: string
  color: string
}

const DynamicDescription = dynamic(() => import('./description').then((mod) => mod.Description), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center">
      <Loader color="dark" />
    </div>
  )
})

export function Info({ gender, description, dimensions, color, category }: InfoProps) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <section className="mt-5 px-1.5">
      <div>
        <Tabs
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={[
            {
              label: 'Описание'
            },
            {
              label: 'Подробности'
            },
            {
              label: 'Опт',
              disabled: true
            }
          ]}
        />
        <TabContent tabID={0} value={activeTab}>
          <div className="py-5 pl-1">
            <h2 className="mb-3 text-2xl font-medium">Описание</h2>
            <DynamicDescription textMarkdown={description} />
          </div>
        </TabContent>
        <TabContent tabID={1} value={activeTab}>
          <Properties
            gender={gender}
            weight={''}
            dimensions={dimensions}
            color={color}
            category={category}
          />
        </TabContent>
        <TabContent tabID={2} value={activeTab}>
          <div>Опт #3</div>
        </TabContent>
      </div>
      <Delivery />
    </section>
  )
}
