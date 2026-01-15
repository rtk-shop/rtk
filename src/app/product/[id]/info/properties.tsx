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
      name: t(`capacity`),
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
                <span>{property.label}</span>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
