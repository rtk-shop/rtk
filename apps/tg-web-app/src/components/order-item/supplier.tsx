import Image from 'next/image'

export function Supplier({ supplier }: { supplier: string }) {
  switch (supplier) {
    case 'nova':
      return (
        <>
          <Image
            src="/icons/novaposta.svg"
            width={24}
            height={26}
            alt="Нова пошта"
            className="ml-1.5 mr-1"
          />
          <span>Нова пошта</span>
        </>
      )
    case 'ukrp':
      return (
        <>
          <Image
            src="/icons/urkposhta.svg"
            width={21}
            height={30}
            alt="Укрпошта"
            className="ml-1.5 mr-2"
          />
          <span>Укрпошта</span>
        </>
      )
    default:
      return <p>{supplier}</p>
  }
}
