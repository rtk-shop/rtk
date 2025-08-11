'use client'

import Image from 'next/image'
import { OrderStatus } from '@/lib/api/graphql/types'
import { cva } from 'cva'
import { FormatPrice } from '@/components/ui/format-price'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { useTranslations } from 'next-intl'

export interface OrderProductsProps {
  products: Array<{
    id: string
    quantity: number
    priceAtOrder: number
    product: { id: string; title: string; preview: string }
  }>
}

const productList = cva('pt-2', {
  variants: {
    status: {
      [OrderStatus.Rejected]: 'opacity-40'
    }
  }
})

export function OrderProducts({ products }: OrderProductsProps) {
  const router = useRouter()

  const t = useTranslations('Common')

  const handleProductRedirect = (productId: string) => {
    router.push(routeNames.product + productId)
  }

  return (
    <section>
      <h2 className="text-xl font-medium">Товары:</h2>
      <ul className={productList({ status: status === OrderStatus.Rejected ? status : null })}>
        {products.map(({ id, quantity, priceAtOrder, product }) => (
          <li key={id} className="mb-2.5 flex items-center">
            <Image
              src={product.preview}
              className="rounded-lg"
              width={44}
              height={55}
              style={{
                width: 44,
                height: 55
              }}
              alt={'изображение товара ' + product.title}
              onClick={() => handleProductRedirect(product.id)}
            />
            <div className="ml-2 min-w-0 flex-[1_1_100%] self-start pt-0.5">
              <p
                onClick={() => handleProductRedirect(product.id)}
                className="overflow-hidden font-medium text-ellipsis whitespace-nowrap"
              >
                {product.title}
              </p>
              <p className="text-sm font-medium">
                <span className="mr-3">
                  {t('nouns.price')}: <FormatPrice price={priceAtOrder} />
                </span>
                <span> {quantity}шт.</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
