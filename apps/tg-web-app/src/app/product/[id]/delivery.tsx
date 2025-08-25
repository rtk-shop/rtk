import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { CategoryType } from '@/lib/api/graphql/types'

export function Delivery({ category }: { category: CategoryType }) {
  const t = useTranslations('Product')
  return (
    <div>
      <p className="mb-1.5 font-medium">{t('deliveryTitle')}:</p>
      <ul className="px-1">
        <li className="mb-2 flex items-center justify-between text-sm leading-none font-medium">
          <div className="flex items-center">
            <Image
              src="/icons/novaposta.svg"
              width={27}
              height={27}
              alt="изображение — Нова Пошта"
            />
            <p className="ml-1.5 text-left">Нова Пошта</p>
          </div>
          <p className="text-right">{t('delivery')}</p>
        </li>
        {category !== CategoryType.Suitcase && (
          <li className="mb-3 flex items-center justify-between text-sm leading-none font-medium">
            <div className="flex items-center">
              <Image
                src="/icons/urkposhta.svg"
                width={23}
                height={23}
                className="ml-0.5"
                alt="изображение — Укрпошта"
              />
              <p className="ml-2.5 text-left">Укрпошта</p>
            </div>
            <p className="text-right">{t('delivery')}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
