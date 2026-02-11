'use client'

import { toast } from 'sonner'
import { Icon } from './icon'
import { IconButton } from './icon-button'
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
    <IconButton onClick={handleClick} className="ml-2 pt-0 pr-0 pb-0 pl-0 text-[22px]">
      {copiedText ? <Icon name="common/check" /> : <Icon name="action/copy" />}
    </IconButton>
  )
}
