import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { formatPhoneNumber } from '@/lib/helpers'
import { BoxSection } from './ui/box-section'

export function Receiver({
  name,
  surname,
  phone
}: {
  name: string
  surname: string
  phone: string
}) {
  return (
    <BoxSection
      title="Отримувач"
      icon={<Icon name="common/user-round" className="text-[22px] text-gray-800" />}
    >
      <Box className="leading-tight">
        <p>
          <span className="mr-1.5 text-gray-500">Имя:</span>
          {name}
        </p>
        <p>
          <span className="mr-1.5 text-gray-500">Фамилия:</span>
          {surname}
        </p>
        <p>
          <span className="mr-1.5 text-gray-500">Телефон:</span>
          {formatPhoneNumber(phone)}
        </p>
      </Box>
    </BoxSection>
  )
}
