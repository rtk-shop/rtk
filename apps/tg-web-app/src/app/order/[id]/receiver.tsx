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
    <section className="mb-2 rounded-xl bg-white px-3 py-2 font-medium shadow-sm">
      <h2 className="mb-1.5 text-lg">Отримувач</h2>
      <div className="text-sm">
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
      </div>
    </section>
  )
}
