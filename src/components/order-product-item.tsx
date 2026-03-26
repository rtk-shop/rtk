'use client'

import Image from 'next/image'
import { FormatPrice } from '@/components/ui/format-price'
import { useRouter } from 'next/navigation'
import { routeNames } from '@/lib/routes'
import { useTranslations } from 'next-intl'
import { Box } from './ui/box'

export interface OrderProductItemProps {
  quantity: number
  priceAtOrder: number
  product: {
    id: string
    title: string
    preview: string
  }
}

export function OrderProductItem({ quantity, priceAtOrder, product }: OrderProductItemProps) {
  const router = useRouter()

  const t = useTranslations('Common')

  const handleProductRedirect = () => {
    router.push(routeNames.product + product.id)
  }

  return (
    <Box as="li" className="mb-2.5 flex items-center">
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
        onClick={handleProductRedirect}
      />
      <Box className="ml-2 min-w-0 flex-[1_1_100%] self-start pt-0.5">
        <p
          onClick={handleProductRedirect}
          className="overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap"
        >
          {product.title}
        </p>
        <p className="text-sm font-medium">
          <span className="mr-3">
            {t('nouns.price')}: <FormatPrice price={priceAtOrder} size="sm" />
          </span>
          <span> {quantity}шт.</span>
        </p>
      </Box>
    </Box>
  )
}
