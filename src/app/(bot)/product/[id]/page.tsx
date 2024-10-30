import { Preview } from './preview'
import { Details } from './details'
// import { Info } from '@/components/views/product/info'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/api'
import 'keen-slider/keen-slider.min.css'

import styles from '@/components/views/product/styles.module.scss'

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  const data = await getProduct(id)

  if (data?.product.__typename === 'NotFound') {
    return notFound()
  }

  //   return (
  //     <div>
  //       <h1>Product page </h1>
  //       <h2>Product ID{id}</h2>
  //       <textarea rows={10} cols={50}>
  //         {JSON.stringify(data)}
  //       </textarea>
  //     </div>
  //   )

  const TODO_TAGS: string[] = []

  const product = data?.product

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.previewWrapper}>
          <Preview images={product.images} />
        </div>
        <div className={styles.detailsWrapper}>
          <Details
            id={product.id}
            sku={product.sku}
            title={product.title}
            tags={TODO_TAGS}
            inStock={product.inStock}
            basePrice={product.basePrice}
            currentPrice={product.currentPrice}
          />
        </div>
      </div>
      {/* <Info
        gender={product.gender}
        description={product.description || ''}
        dimensions={dimensions}
        color={product.colorName}
        category={product.category}
      /> */}
    </div>
  )
}
