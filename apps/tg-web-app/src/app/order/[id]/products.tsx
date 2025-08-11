import { useTranslations } from 'next-intl'
import { OrderProductItem } from '@/components/order-product-item'

export interface OrderProductsProps {
  products: Array<{
    id: string
    quantity: number
    priceAtOrder: number
    product: { id: string; title: string; preview: string }
  }>
}

export function OrderProducts({ products }: OrderProductsProps) {
  const t = useTranslations('Common')

  return (
    <section>
      <h2 className="text-xl font-medium">Товары:</h2>
      <ul className="pt-2">
        {products.map(({ id, quantity, priceAtOrder, product }) => (
          <OrderProductItem
            key={id}
            quantity={quantity}
            priceAtOrder={priceAtOrder}
            product={product}
          />
        ))}
      </ul>
    </section>
  )
}
