'use client'

import { useState } from 'react'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Properties } from './properties'
import { Delivery } from './delivery'
import { Description } from './description'

interface InfoProps {
  gender: string
  description: string
  category: string
  dimensions: string
  color: string
}

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
          <Description text={description} />
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
