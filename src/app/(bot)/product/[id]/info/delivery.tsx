import Image from 'next/image'

export function Delivery() {
  return (
    <div>
      <p className="mb-2 font-medium">Способы доставки:</p>
      <ul className="px-1">
        <li className="mb-3 flex items-center justify-between text-[14px] font-medium leading-none">
          <div className="flex items-center">
            <Image src="/icons/novaposta.svg" width={30} height={30} alt="«Нова пошта»" />
            <p className="ml-1.5 text-left">Нова Пошта</p>
          </div>
          <p className="text-right">По тарифам компании</p>
        </li>
      </ul>
    </div>
  )
}
