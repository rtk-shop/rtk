import { Box } from '@/components/ui/box'
import { Icon } from '@/components/ui/icon'
import { labelStyle } from './lib/constants'
import { SectionWrapper } from './ui/section-wrapper'
import { SectionHeader } from './ui/section-header'
import { formatPhoneNumber } from '@/lib/helpers'

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
    <SectionWrapper>
      <SectionHeader
        title="Отримувач"
        icon={<Icon name="common/user-round" className="text-[23px]" />}
      />
      <Box className="mb-2.5 grid grid-cols-[40%_1fr] grid-rows-[auto_auto_auto] gap-2 text-sm leading-4 font-medium">
        <Box>
          <p className={labelStyle}>Імʼя</p>
        </Box>
        <Box>
          <p>{name}</p>
        </Box>
        <Box>
          <p className={labelStyle}>Прізвище</p>
        </Box>
        <Box>
          <p>{surname}</p>
        </Box>
        <Box>
          <p className={labelStyle}>Телефон</p>
        </Box>
        <Box>
          <p>{formatPhoneNumber(phone)}</p>
        </Box>
      </Box>
    </SectionWrapper>
  )
}
