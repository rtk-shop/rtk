import Image from 'next/image'
import { Box } from '@/components/ui/box'
import { useTranslations } from 'next-intl'
import { CategoryType } from '@/lib/api/graphql/types'

export function Delivery({ category }: { category: CategoryType }) {
  const t = useTranslations('Product')

  return (
    <Box>
      <p className="mb-1.5 font-medium">{t('deliveryTitle')}:</p>
      <Box as="ul" className="text-sm leading-none font-medium">
        <Box as="li" flex="row" align="center" justify="between" className="mb-2">
          <Box flex="row" align="center">
            <Image
              src="/icons/novaposta.svg"
              width={27}
              height={27}
              alt="изображение — Нова Пошта"
            />
            <p className="ml-1.5 text-left">Нова Пошта</p>
          </Box>
          <p className="text-right">{t('delivery')}</p>
        </Box>
        {category !== CategoryType.Suitcase && (
          <Box as="li" flex="row" align="center" justify="between" className="mb-3">
            <Box flex="row" align="center">
              <Image
                src="/icons/urkposhta.svg"
                width={23}
                height={23}
                className="ml-0.5"
                alt="изображение — Укрпошта"
              />
              <p className="ml-2.5 text-left">Укрпошта</p>
            </Box>
            <p className="text-right">{t('delivery')}</p>
          </Box>
        )}
      </Box>
    </Box>
  )
}
