import { Box } from '@/components/ui/box'
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
    <Box className="px-1 py-5 font-medium">
      <Box>
        <Box as="ul">
          {details
            .filter(({ value }) => !!value)
            .map((property) => (
              <Box
                as="li"
                flex="row"
                justify="between"
                gap={1}
                key={property.name}
                className="mb-2.5 leading-none"
              >
                <span className="text-gray-500">{property.name}</span>
                <Box as="span" className="leader-dots h-1e flex-1" />
                <span>{property.value}</span>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
