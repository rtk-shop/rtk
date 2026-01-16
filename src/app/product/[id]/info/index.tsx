'use client'

import { Box } from '@/components/ui/box'
import { type ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

export function Info({
  description,
  properties
}: {
  description: ReactNode
  properties: ReactNode
}) {
  const t = useTranslations('Product')

  return (
    <Box as="section">
      <Box>
        <Tabs defaultValue="description">
          <div className="flex justify-center">
            <TabsList className="w-10/12">
              <TabsTrigger className="w-full" value="description">
                {t('description')}
              </TabsTrigger>
              <TabsTrigger className="w-full" value="details">
                {t('details')}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="description">
            <Box className="py-5 pl-1">{description}</Box>
          </TabsContent>
          <TabsContent value="details">{properties}</TabsContent>
        </Tabs>
      </Box>
    </Box>
  )
}
