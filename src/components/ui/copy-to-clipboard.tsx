'use client'

import { Button } from './button'
import { toast } from 'sonner'
import { Icon } from './icon'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from '@/hooks'

export function CopyToClipboard({ what }: { what: string }) {
  const [copiedText, copy] = useCopyToClipboard()

  const t = useTranslations('Common.toasts.copy')

  const handleClick = () => {
    copy(what)
      .then(() => {
        toast.success(t('success'), {
          duration: 2000
        })
      })
      .catch(() => {
        toast.error(t('titleError'), {
          richColors: true,
          duration: 3000,
          description: t('details')
        })
      })
  }

  return (
    <Button color="ghost" onClick={handleClick} className="ml-2 bg-transparent p-1! text-[19px]">
      {copiedText ? <Icon name="action/copy-check" /> : <Icon name="action/copy" />}
    </Button>
  )
}
