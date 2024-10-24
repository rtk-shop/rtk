import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/lib/navigation'

import useTranslation from 'next-translate/useTranslation'

const categoriesValues: Array<{
  img: string
  to: string
  i18n: string
}> = [
  {
    img: '/assets/bag.webp',
    to: routeNames.root,
    i18n: 'bags'
  },
  {
    img: '/assets/wallet.webp',
    to: routeNames.root,
    i18n: 'wallets'
  },
  {
    img: '/assets/backpack.webp',
    to: routeNames.root,
    i18n: 'backpacks'
  },
  {
    img: '/assets/suitcase.webp',
    to: routeNames.root,
    i18n: 'suitcases'
  }
]

export function Categories() {
  const { t } = useTranslation('common')

  return (
    <section className="mt-20 px-4">
      <ul className="rounded-md border border-gray-400 bg-white/10 text-white">
        {categoriesValues.map((category, ind) => (
          <li
            key={ind}
            className="relative mb-2 flex pl-2 after:absolute after:-bottom-1.5 after:left-1/2 after:h-[1px] after:w-8/12 after:-translate-x-2/4 after:bg-gray-400 after:last:hidden"
          >
            <Link href={category.to} className="flex items-center">
              <div className="mr-1 size-14">
                <Image
                  priority
                  src={category.img}
                  quality={100}
                  width={260}
                  height={260}
                  alt={`Изображение категории - ${t(`categories.${category.i18n}`)}`}
                />
              </div>
              <div className="text-lg font-medium">
                <p>{t(`categories.${category.i18n}`)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
