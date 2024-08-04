import { Preview } from './preview'
import { Details } from './details'
import { Info } from './info'
import { useGetProductQuery } from '@/graphql/product/_gen_/product.query'

import styles from './styles.module.scss'
import 'keen-slider/keen-slider.min.css'

export function ProductIndex({ productID }: { productID: string }) {
  const { loading, data } = useGetProductQuery({
    variables: {
      id: productID
    }
  })

  if (loading) {
    return <p>Loading...</p>
  }

  if (data && data.product.__typename === 'Product') {
    const { product } = data

    const TODO_TAGS: string[] = []

    const dimensions = 'no no no'

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
        <Info
          gender={product.gender}
          description={product.description || ''}
          dimensions={dimensions}
          color={product.colorName}
          category={product.category}
        />
        {/* <Recommended /> */}
      </div>
    )
  }
}
