'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Loader } from '@repo/ui'
import { Properties } from './properties'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { CategoryType, Gender } from '@/lib/api/graphql/types'
import { useTranslations } from 'next-intl'

export interface InfoProps {
  gender: Gender
  description?: string
  category: CategoryType
  dimensions: string
  weightKG: number
  color: string
}

const DynamicDescription = dynamic(() => import('./description').then((mod) => mod.Description), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center">
      <Loader color="secondary" />
    </div>
  )
})

export function Info({ gender, description, dimensions, color, weightKG, category }: InfoProps) {
  const t = useTranslations('Product')
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex)
  }

  return (
    <section className="mt-5">
      <div>
        <Tabs
          activeTab={activeTab}
          onChange={handleTabChange}
          tabs={[
            {
              label: t('description')
            },
            {
              label: t('details')
            }
          ]}
        />
        <TabContent tabID={0} value={activeTab}>
          <div className="py-5 pl-1">
            <DynamicDescription textMarkdown={description || ''} />
          </div>
        </TabContent>
        <TabContent tabID={1} value={activeTab}>
          <Properties
            gender={gender}
            weightKG={weightKG}
            dimensions={dimensions}
            color={color}
            category={category}
          />
        </TabContent>
      </div>
    </section>
  )
}
