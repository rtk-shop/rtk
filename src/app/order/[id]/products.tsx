import { Box } from '@/components/ui/box'
import { FormatPrice } from '@/components/ui/format-price'
import { OrderProduct } from './ui/order-product'
import { SectionWrapper } from './ui/section-wrapper'
import { useTranslations } from 'next-intl'

export interface ProductsProps {
  orderPrice: number
  deliveryCost: number
  products: Array<{
    id: string
    quantity: number
    priceAtOrder: number
    product: { id: string; title: string; preview: string }
  }>
}

export function Products({ orderPrice, deliveryCost, products }: ProductsProps) {
  const _ = useTranslations('Common')

  const productsAmount = products.reduce((counter, product) => counter + product.quantity, 0)

  return (
    <SectionWrapper>
      <h2 className="mb-3 text-xl font-medium tracking-tight">
        Товари <span className="text-lg">({productsAmount})</span>
      </h2>
      <Box as="ul">
        {products.map(({ id, quantity, priceAtOrder, product }) => (
          <li key={id}>
            <OrderProduct quantity={quantity} priceAtOrder={priceAtOrder} product={product} />
          </li>
        ))}
      </Box>
      <Box className="mb-1.5 h-0.5 bg-gray-100" />
      <Box flex="row" align="center" justify="between" className="mb-1.5 text-gray-400">
        <p className="text-sm font-medium">Товари</p>
        <FormatPrice price={orderPrice} size="sm" />
      </Box>
      <Box flex="row" align="center" justify="between" className="mb-1.5 text-gray-400">
        <p className="text-sm font-medium">Доставка</p>
        <FormatPrice price={deliveryCost} size="sm" />
      </Box>
      <Box className="mb-2 h-0.5 bg-gray-100" />
      <Box flex="row" align="center" justify="between">
        <p className="font-medium">Разом до сплати</p>
        <FormatPrice price={orderPrice + deliveryCost} size="XXL" />
      </Box>
    </SectionWrapper>
  )
}
