'use client'

import { formatPrice } from '@repo/utils'
import { ImagePlaceholder } from '@repo/ui'

export function OrderProduct({
  quantity,
  priceAtOrder,
  product
}: {
  quantity: number
  priceAtOrder: number
  product: {
    id: string
    title: string
    preview: string
    currentPrice: number
  }
}) {
  const handlePreviewClick = () => {
    console.log('product ID', product.id)
  }

  return (
    <div className="flex">
      <div className="relative mr-2 w-full max-w-32 sm:max-w-36">
        <div className="rounded-lg" onClick={handlePreviewClick}>
          <ImagePlaceholder
            width={155}
            height={193}
            src={product.preview}
            alt={'изображение товара ' + product.title}
          />
        </div>
      </div>
      <div className="min-w-0 flex-[1_1_100%] self-start pt-1.5">
        <p className="mb-2 overflow-hidden text-lg font-medium text-ellipsis whitespace-nowrap">
          {product.title}
        </p>
        <div className="">
          <p>
            <span className="text-gray-700">Цена на момент заказа:</span>&nbsp;
            <span className="font-medium">{formatPrice(priceAtOrder)}₴</span>
          </p>
          <p>
            <span className="text-gray-700">Текущая цена:</span>&nbsp;
            <span className="font-medium">{formatPrice(product.currentPrice)}₴</span>
          </p>
          <p>
            <span className="text-gray-700">Количество:</span>&nbsp;
            <span className="font-medium">{quantity}шт.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
