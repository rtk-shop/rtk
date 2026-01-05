'use client'

import { Box } from '@/components/ui/box'
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
    <Box as="section" className="mt-5">
      <Box>
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
          <Box className="py-5 pl-1">{description}</Box>
        </TabContent>
        <TabContent tabID={1} value={activeTab}>
          {properties}
        </TabContent>
      </Box>
    </Box>
  )
}
