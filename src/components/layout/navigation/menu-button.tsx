'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { useAppState } from '@/stores/app/store'

export function MenuButton() {
  const openSidebar = useAppState((state) => state.openSidebar)

  return (
    <Button
      color="ghost"
      size="lg"
      onClick={openSidebar}
      className="bg-transparent text-[24px] text-white"
    >
      <Icon name="common/menu" />
    </Button>
  )
}
