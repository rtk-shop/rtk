import { cva } from 'cva'
import { Tags } from './tags'
import { Delivery } from './delivery'
import { SizeGuide } from '@/components/ui/size-guide'
import { SubControls } from './sub-controls'
import { formatPrice } from '@/lib/helpers'
// import { addToCart } from '@/apollo/cache/cart'
import { AddToCartButton } from './add-to-cart'

import styles from './styles.module.scss'

interface DetailsProps {
  id: string
  sku: string
  title: string
  currentPrice: number
  tags?: string[]
  basePrice: number
  inStock: boolean
}

const priceTitle = cva('text-[23px] font-medium', {
  variants: {
    withDiscount: {
      true: 'mx-1.5 text-red-600',
      false: 'text-black'
    }
  }
})

export function Details({ id, sku, title, currentPrice, tags, inStock, basePrice }: DetailsProps) {
  // const [amount, setAmount] = useState(1)

  // const handleAddToCart = () => {
  //   addToCart({
  //     productId: id,
  //     price: currentPrice,
  //     amount
  //   })

  //   setAmount(1)
  // }

  // const handleControllerChange = (value: 'add' | 'sub' | number) => {
  //   if (typeof value === 'number') {
  //     setAmount(value)
  //     return
  //   }

  //   if (value === 'add') {
  //     setAmount((prev) => prev + 1)
  //   } else {
  //     setAmount((prev) => prev - 1)
  //   }
  // }

  const withDiscount = basePrice !== currentPrice

  return (
    <section className="px-1.5">
      {/*  */}
      <h1 className="mb-1.5 mt-4 text-lg font-medium leading-5">{title}</h1>
      {/*  */}
      <div className="mb-3 flex items-center">
        {withDiscount && (
          <span className="text-lg text-gray-500 line-through">{formatPrice(basePrice)}</span>
        )}
        {/*  */}
        <p className={priceTitle({ withDiscount })}>{formatPrice(currentPrice)} грн</p>
        {/*  */}
        {withDiscount && (
          <span className="w-12 bg-green-light px-1 text-center text-[13px] font-medium text-white">
            -{Math.round(((basePrice - currentPrice) * 100) / basePrice)}%
          </span>
        )}
      </div>
      {/*  */}
      <SizeGuide title={'Выберите размер'} current="L" available={['M', '2XL', 'L']} />
      {/*  */}
      <AddToCartButton productID={id} inStock={inStock} />
      {/*  */}
      {/* <SubControls productId={id} /> */}
      {/* {tags && tags.length > 1 && <Tags tags={tags} />} */}
      <Delivery />
    </section>
  )
}
