import Image from 'next/image'
import { Box } from '@/components/ui/box'
import { useTranslations } from 'next-intl'
import { CategoryType } from '@/lib/api/graphql/types'

export function Delivery({ category, inStock }: { category: CategoryType; inStock: boolean }) {
  const t = useTranslations('Product')

  const shipmentTimestamp = (
    <span className="font-medium text-indigo-400">{t(shipmentForecast(inStock))}</span>
  )

  return (
    <Box className="mb-4">
      <p className="mb-1.5 text-lg font-medium">{t('delivery.title')}:</p>

      <Box className="mb-2 flex items-center">
        <Box className="relative flex size-11 items-center justify-center rounded-full bg-gray-100">
          <Image
            src="/icons/package.png"
            width={26}
            height={26}
            alt="изображение — эмодзи посылки"
          />
          <Image
            src="/icons/novaposta.svg"
            width={23}
            height={23}
            alt="изображение — Нова Пошта"
            className="absolute top-5.5 right-0 z-10"
          />
        </Box>
        <Box className="ml-3 pt-1 font-medium">
          <p className="text-base leading-none">
            {t('delivery.toWarehouse')}
            {category !== CategoryType.Suitcase && '/' + t('delivery.postomat')}
          </p>
          <p className="text-sm font-normal text-gray-600">
            {t('delivery.willSend')}&nbsp;{shipmentTimestamp}
          </p>
        </Box>
      </Box>
      {/*  */}
      <Box className="mb-2 flex items-center">
        <Box className="relative flex size-11 items-center justify-center rounded-full bg-gray-100">
          <Image src="/icons/truck.png" width={26} height={26} alt="изображение — эмодзи машины" />
          <Image
            src="/icons/novaposta.svg"
            width={23}
            height={23}
            alt="изображение — Нова Пошта"
            className="absolute top-5.5 right-0 z-10"
          />
        </Box>
        <Box className="ml-3 pt-1 font-medium">
          <p className="text-base leading-none">{t('delivery.byCourier')}</p>
          <p className="text-sm font-normal text-gray-600">
            {t('delivery.willSend')}&nbsp;{shipmentTimestamp}
          </p>
        </Box>
      </Box>
    </Box>
  )
}

const shipmentForecast = (inStock: boolean): string => {
  if (!inStock) return 'delivery.byAvailability'

  const now = new Date()
  const currentHour = now.getHours()
  const dayOfWeek = now.getDay() // 0 - Sunday, 6 - Saturday

  if (dayOfWeek === 6) {
    return 'delivery.inDays1'
  }

  return currentHour < 16 ? 'delivery.today' : 'delivery.tomorrow'
}
