import Image from 'next/image'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'

export function NoDataPlug({ onActionClick }: { onActionClick(): void }) {
  return (
    <Box flex="row" align="center" justify="center">
      <Box flex="col" align="center" justify="center" className="mt-52 max-w-60">
        <Image src="/icons/pensive.webp" width={90} height={90} alt="sad icon" className="mb-3" />
        <p className="mb-4 text-center text-xl leading-none font-medium tracking-tight">
          На ваш запит нічого не знайдено
        </p>
        <Button fullWidth color="secondary" onClick={onActionClick} rounded="xl">
          Дивитись все
        </Button>
      </Box>
    </Box>
  )
}
