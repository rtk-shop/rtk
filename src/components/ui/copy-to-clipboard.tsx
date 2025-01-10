import { useCopyToClipboard } from '@/hooks'
import { Icon } from './icon'
import { IconButton } from './icon-button'

export function CopyToClipboard({ what }: { what: string }) {
  const [copiedText, copy] = useCopyToClipboard()

  const handleClick = () => {
    copy(what)
      .then(() => {
        console.log('Copied!', { what })
      })
      .catch((error) => {
        console.error('Failed to copy!', error)
      })
  }

  return (
    <IconButton onClick={handleClick} className="ml-2 pb-0 pl-0 pr-0 pt-0 text-[22px]">
      {copiedText ? <Icon name="common/check" /> : <Icon name="action/copy" />}
    </IconButton>
  )
}