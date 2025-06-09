import { formatPhoneNumber } from '@repo/utils'

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
    <section className="mb-2.5 basis-full rounded-xl bg-gray-100 p-4 sm:mr-3 sm:mb-0 sm:basis-1/2">
      <h2 className="mb-2 text-lg font-medium">Получатель</h2>
      <div>
        <p className="flex items-center">
          <span className="mr-1 text-gray-500">Имя:</span>
          {name}
        </p>
        <p className="flex items-center">
          <span className="mr-1 text-gray-500">Фамилия:</span>
          {surname}
        </p>
        <p className="flex items-center">
          <span className="mr-1 text-gray-500">Телефон:</span>
          {formatPhoneNumber(phone)}
        </p>
      </div>
    </section>
  )
}
