import Link from 'next/link'
import Image from 'next/image'
import { routeNames } from '@/lib/constants'
import { useTranslations } from 'next-intl'

const categoriesValues: Array<{
  img: string
  to: string
  i18n: string
  sub?: string[]
}> = [
  {
    img: '/assets/backpack.webp',
    to: routeNames.catalog,
    i18n: 'backpacks'
  },
  {
    img: '/assets/suitcase.webp',
    to: routeNames.catalog,
    i18n: 'suitcases',
    sub: ['nouns.polypropylene', 'nouns.textile', 'nouns.covers']
  },
  {
    img: '/assets/bag.webp',
    to: routeNames.catalog,
    i18n: 'bags',
    sub: ['nouns.sling', 'actions.forDocs', 'actions.forLaptop']
  }
]

export function Categories() {
  const t = useTranslations('Common')

  return (
    <section className="">
      <ul className="relative flex flex-col">
        {categoriesValues.map((category, ind) => (
          <li key={ind} className="mb-2.5 flex">
            <Link href={category.to} className="flex items-center">
              <div className="size-36">
                <Image
                  priority
                  src={category.img}
                  quality={100}
                  width={144}
                  height={144}
                  alt={`Изображение категории - ${t(`categories.${category.i18n}`)}`}
                />
              </div>
              <div className="pt-0 font-medium text-gray-100">
                <p className="mb-1 text-2xl font-medium">{t(`categories.${category.i18n}`)}</p>
                <ul className="list-inside pl-0.5 text-sm">
                  {category.sub &&
                    category.sub.map((el, index) => (
                      <li key={index}>
                        <li key={index}>- {t(el)}</li>
                      </li>
                    ))}
                  <li className="list-none text-gray-300 underline">{t('actions.showAll')}</li>
                </ul>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

// const pseudoLine = cva('absolute top-2/4 left-1/2 bg-gray-400', {
//   variants: {
//     type: {
//       vertical: 'h-full w-px -translate-y-2/4',
//       horizontal: 'h-px w-full -translate-x-2/4'
//     }
//   }
// })

/* <ul className="relative flex flex-wrap rounded-md border border-gray-400 bg-white/10 text-gray-100">
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
              <div className="text-center text-sm font-medium">
                <p>{t(`categories.${category.i18n}`)}</p>
              </div>
            </Link>
          </li>
        ))}
        <div className={pseudoLine({ type: 'vertical' })} />
        <div className={pseudoLine({ type: 'horizontal' })} />
      </ul> */
