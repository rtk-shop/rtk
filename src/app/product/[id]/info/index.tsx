'use client'

import { type ReactNode, useState } from 'react'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

export interface InfoProps {
  description: ReactNode
  properties: ReactNode
}

export function Info({ description, properties }: InfoProps) {
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
          <div className="py-5 pl-1">{description}</div>
        </TabContent>
        <TabContent tabID={1} value={activeTab}>
          {properties}
        </TabContent>
      </div>
    </section>
  )
}
