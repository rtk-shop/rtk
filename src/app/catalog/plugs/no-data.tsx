import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function NoDataPlug({ onActionClick }: { onActionClick(): void }) {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-52 flex max-w-60 flex-col items-center justify-center">
        <Image
          src="/icons/pensive.webp"
          width={90}
          height={90}
          unoptimized
          alt="sad icon"
          className="mb-3"
        />
        <p className="mb-4 text-center text-lg leading-none font-medium">
          На ваш запит нічого не знайдено
        </p>
        <Button color="primary" onClick={onActionClick} fullWidth>
          Дивитись все
        </Button>
      </div>
    </div>
  )
}
