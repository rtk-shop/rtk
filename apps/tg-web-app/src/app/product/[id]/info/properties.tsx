import { useTranslations } from 'next-intl'
import { CategoryType, Gender } from '@/lib/api/graphql/types'

export interface PropertiesProps {
  gender: Gender
  category: CategoryType
  weightKG: number
  dimensions: string
  color: string
}

export function Properties({ gender, dimensions, weightKG, category }: PropertiesProps) {
  const t = useTranslations('Common')

  const details = [
    {
      name: t(`nouns.size`) + ' в см.',
      value: dimensions
    },
    {
      name: t(`nouns.weight`),
      value: weightKG + ' кг.'
    },
    // {
    //   name: 'Цвет',
    //   value: color
    // },
    {
      name: 'Тип',
      value: t(`gender.${gender.toLowerCase()}`)
    },
    {
      name: t('nouns.category'),
      value: t(`categories.${category.toLowerCase()}`)
    }
  ]

  return (
    <div className="py-5 pl-1">
      <div>
        <ul>
          {details
            .filter(({ value }) => !!value)
            .map((property) => (
              <li key={property.name} className="flex justify-between font-medium">
                <span className="shrink-0 text-gray-500">{property.name}</span>
                <span className="basis-8/12 text-black">
                  <span className="mr-5 text-gray-500">—</span>
                  <span>{property.value}</span>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
