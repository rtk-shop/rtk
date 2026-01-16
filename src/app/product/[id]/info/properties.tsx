import { Box } from '@/components/ui/box'
import { useTranslations } from 'next-intl'
import { CategoryType, Gender } from '@/lib/api/graphql/types'

export interface PropertiesProps {
  gender: Gender
  color: string
  category: CategoryType
  weight?: number | null
  capacity?: number | null
  dimensions?: string | null
}

export function Properties({ gender, dimensions, weight, category, capacity }: PropertiesProps) {
  const t = useTranslations('Common')

  const details = [
    {
      name: t('nouns.category'),
      value: category,
      label: t(`categories.${category.toLowerCase()}`)
    },
    {
      name: 'Тип',
      value: gender,
      label: t(`gender.${gender.toLowerCase()}`)
    },
    {
      name: t(`nouns.size`),
      value: dimensions,
      label: dimensions + ' см.'
    },
    {
      name: t(`nouns.weight`),
      value: weight,
      label: weight + ' кг.'
    },
    {
      name: t(`nouns.capacity`),
      value: capacity,
      label: capacity + ' л.'
    }
    // {
    //   name: 'Цвет',
    //   value: color
    // },
  ]

  return (
    <Box className="px-1 py-5 font-medium">
      <Box>
        <Box as="ul">
          {details
            .filter(({ value }) => !!value)
            .map((property) => (
              <Box key={property.name} as="li" className="mb-2">
                <p className="text-sm leading-none text-gray-500">{property.name}</p>
                <p>{property.label}</p>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
