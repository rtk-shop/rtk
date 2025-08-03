import { novapostaImage, ukrpostaImage } from '@repo/assets'

export function DeliverySupplier({ supplier }: { supplier: string }) {
  switch (supplier) {
    case 'NOVAP':
      return (
        <>
          <img src={novapostaImage.src} width={24} height={24} className="mr-1 size-6" />
          <span>Нова пошта</span>
        </>
      )
    case 'UKRP':
      return (
        <>
          <img src={ukrpostaImage.src} width={20} height={28} className="mr-2 h-7 w-5" />
          <span>Укрпошта</span>
        </>
      )
    default:
      return <p>{supplier}</p>
  }
}
