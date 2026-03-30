import { Box } from '@/components/ui/box'
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
    <Box as="section" className="mb-2 rounded-xl bg-white px-3 py-2 shadow-sm">
      <h2 className="mb-1 text-lg font-medium">Отримувач</h2>
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
    </Box>
  )
}
