import { cva } from 'cva'
import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/lib/navigation'
import { useTranslations } from 'next-intl'

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

const pseudoLine = cva('absolute left-1/2 top-2/4 bg-gray-400', {
  variants: {
    type: {
      vertical: 'h-full w-px -translate-y-2/4',
      horizontal: 'h-px w-full -translate-x-2/4'
    }
  }
})

export function Categories() {
  const t = useTranslations('Common')

  return (
    <section className="px-4">
      <ul className="relative flex flex-wrap rounded-md border border-gray-400 bg-white/10 text-gray-100">
        {categoriesValues.map((category, ind) => (
          <li key={ind} className="mb-2.5 flex basis-1/2 justify-center">
            <Link href={category.to} className="items-center">
              <div className="size-16">
                <Image
                  priority
                  src={category.img}
                  quality={100}
                  width={260}
                  height={260}
                  alt={`Изображение категории - ${t(`categories.${category.i18n}`)}`}
                />
              </div>
              <div className="text-center text-[14px] font-medium">
                <p>{t(`categories.${category.i18n}`)}</p>
              </div>
            </Link>
          </li>
        ))}
        <div className={pseudoLine({ type: 'vertical' })} />
        <div className={pseudoLine({ type: 'horizontal' })} />
      </ul>
    </section>
  )
}
