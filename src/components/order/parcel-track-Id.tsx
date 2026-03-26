import { Box } from '@/components/ui/box'
import { CopyToClipboard } from '@/components/ui/copy-to-clipboard'
import { Icon } from '../ui/icon'

export function ParcelTrackId({ trackId }: { trackId?: string | null }) {
  return (
    <Box flex="row" justify="center" align="center" className="rounded-lg bg-gray-200 p-2">
      {trackId ? (
        <>
          <span className="mr-2 text-sm leading-none font-medium">Номер ТТН:</span>
          <p className="text-sm leading-none">{trackId}</p>
          <CopyToClipboard what={trackId} />
        </>
      ) : (
        <>
          <Icon name="common/barcode" className="mr-2 text-lg" />
          <p className="text-sm leading-none font-medium">Очікуємо ТТН посилки</p>
        </>
      )}
    </Box>
  )
}
