import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Box } from '@/components/ui/box'
import { FormatPrice } from '@/components/ui/format-price'
import { routeNames } from '@/lib/routes'

export interface OrderProductProps {
  size?: 'sm' | 'md'
  quantity: number
  priceAtOrder: number
  product: {
    id: string
    title: string
    preview: string
  }
}

export function OrderProduct({ quantity, priceAtOrder, product, size = 'md' }: OrderProductProps) {
  const imageSize = {
    sm: {
      width: 48,
      height: 60,
      className: 'w-12'
    },
    md: {
      width: 54,
      height: 65,
      className: 'w-13.5'
    }
  }

  return (
    <Box className="mb-2.5 flex items-center">
      <Link href={routeNames.product + product.id} prefetch={false} className="shrink-0">
        <Image
          src={product.preview}
          className={clsx('aspect-4/5 rounded-lg', imageSize[size].className)}
          width={imageSize[size].width}
          height={imageSize[size].height}
          alt={'изображение товара ' + product.title}
        />
      </Link>
      <Box className="ml-2 min-w-0 flex-[1_1_100%] self-start pt-1">
        <Link
          href={routeNames.product + product.id}
          prefetch={false}
          className="clear-both line-clamp-2 max-h-7 text-sm leading-3.5 font-medium text-ellipsis whitespace-normal no-underline"
        >
          {product.title}
        </Link>

        <Box flex="row" align="center" justify="between" className="pt-1.5">
          <Box flex="row" align="center">
            <FormatPrice price={priceAtOrder} size="sm" />
            <div className="mx-2.5 size-1 rounded-full bg-gray-300" />
            <span className="text-sm font-medium text-gray-500">{quantity} шт.</span>
          </Box>
          <Box>
            <FormatPrice price={priceAtOrder * quantity} size="sm" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
