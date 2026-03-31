import Image from 'next/image'
import { cva } from 'cva'

const nameStyle = cva('text-sm tracking-tight')

export function DeliverySupplier({ supplier }: { supplier: string }) {
  switch (supplier) {
    case 'NOVAP':
      return (
        <div className="flex items-center">
          <Image
            src="/icons/novaposta.svg"
            alt="nova poshta logo"
            width={24}
            height={24}
            className="mr-0.5 size-6"
          />
          <span className={nameStyle()}>Нова Пошта</span>
        </div>
      )
    case 'UKRP':
      return (
        <div className="flex items-center">
          <Image
            src="/icons/urkposhta.svg"
            alt="ukr poshta logo"
            width={20}
            height={24}
            className="mr-0.5 h-6 w-5"
          />
          <span className={nameStyle()}>Укрпошта</span>
        </div>
      )
    default:
      return <p>{supplier}</p>
  }
}
