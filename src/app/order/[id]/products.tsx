import { Box } from '@/components/ui/box'
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
  const _ = useTranslations('Common')

  return (
    <Box as="section" className="rounded-lg bg-white p-3 shadow-sm">
      <h2 className="text-xl font-medium">Товары:</h2>
      <Box as="ul" className="pt-2">
        {products.map(({ id, quantity, priceAtOrder, product }) => (
          <OrderProductItem
            key={id}
            quantity={quantity}
            priceAtOrder={priceAtOrder}
            product={product}
          />
        ))}
      </Box>
    </Box>
  )
}
