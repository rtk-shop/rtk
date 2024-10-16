interface CapProps {
  currency: number
}

export function Cap({ currency }: CapProps) {
  return (
    <div className="bg-cap-pattern hidden bg-black lg:block">
      <div className="m-auto flex max-w-[1700px] justify-end px-5 py-2">
        <ul className="flex text-[14px] font-medium text-slate-200 *:ml-5">
          <li>
            <span>Курс: </span>
            <span className="font-semibold text-white">1$={currency}₴</span>
          </li>
          <li>
            <span>Тел: </span>
            <span className="font-semibold text-white">
              {process.env.NEXT_PUBLIC_CONTACT_PHONE}
            </span>
          </li>
          <li>
            <span>Прием заказов: </span>
            <span className="font-semibold text-white">
              {process.env.NEXT_PUBLIC_ORDER_ACCEPTANCE_TIME}
            </span>
          </li>
          <li>
            <span>Дни работы: </span>
            <span className="font-semibold text-white">{process.env.NEXT_PUBLIC_WORKING_DAYS}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
