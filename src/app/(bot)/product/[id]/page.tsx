import { Preview } from './preview'
import { Details } from './details'
import { Info } from './info'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import 'keen-slider/keen-slider.min.css'

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const data = await getProduct(id)

  if (data?.product.__typename === 'NotFound') {
    return notFound()
  }

  if (!(data?.product.__typename === 'Product')) {
    return notFound()
  }

  const TODO_TAGS: string[] = []

  const product = data?.product

  return (
    <div className="mb-[69px]">
      <Preview images={product.images} />
      <Details
        id={product.id}
        sku={product.sku}
        title={product.title}
        tags={TODO_TAGS}
        inStock={product.inStock}
        basePrice={product.basePrice}
        currentPrice={product.currentPrice}
      />
      <Info
        gender={product.gender}
        description={product.description || ''}
        dimensions={'11x11x11'}
        color={product.colorName}
        category={product.category}
      />
    </div>
  )
}
