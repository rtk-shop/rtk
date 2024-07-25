import { useState } from 'react'
import clsx from 'clsx'
import ExclamationIcon from '../../../../../public/icons/exclamation-circle.svg'
import CheckIcon from '../../../../../public/icons/check-circle.svg'
import HeaderCartIcon from '../../../../../public/icons/header_cart.svg'
import { SvgIcon } from '@/components/ui/svg-icon'
import { Button } from '@/components/ui/button'
import { Tags } from './tags'
import { Delivery } from './delivery'
import { SizeGuide } from './size-guide'
import { SubControls } from './sub-controls'
import { formatPrice } from '@/utils/helpers'
import { Amaunt } from './amaunt'
import { addToCart } from '@/apollo/cache/cart'

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

export function Details({ id, sku, title, currentPrice, tags, inStock, basePrice }: DetailsProps) {
  const [amount, setAmount] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      price: currentPrice,
      amount
    })

    setAmount(1)
  }

  const handleControllerChange = (value: 'add' | 'sub' | number) => {
    if (typeof value === 'number') {
      setAmount(value)
      return
    }

    if (value === 'add') {
      setAmount((prev) => prev + 1)
    } else {
      setAmount((prev) => prev - 1)
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        {/*  */}
        <h1 className={styles.title}>{title}</h1>
        {/*  */}
        <div className={styles.availability}>
          <div className={clsx(styles.availabilityPlug, !inStock && styles.availabilityOutStock)}>
            <SvgIcon
              className={clsx({
                [styles.availabilityIcon]: true,
                [styles.availabilityIconInStock]: inStock
              })}
            >
              {inStock ? <CheckIcon /> : <ExclamationIcon />}
            </SvgIcon>
            <span>{inStock ? 'В наличии' : 'Нет в наличии'}</span>
          </div>
          <div className={styles.skuWrapper}>
            <p className={styles.skuCode}>
              <span>Код:</span>&nbsp;{sku}
            </p>
          </div>
        </div>
        {/*  */}
        <div className={styles.priceBox}>
          <p className={styles.currentPrice}>
            {formatPrice(currentPrice)}&nbsp;<span>$</span>
          </p>
          {basePrice !== currentPrice && (
            <div className={styles.discountPriceBox}>
              <span className={styles.discountPrice}>{formatPrice(basePrice)}&nbsp;$</span>
              <span className={styles.percentage}>
                -{Math.round(((basePrice - currentPrice) * 100) / basePrice)}
                <span>%</span>
              </span>
            </div>
          )}
        </div>
        {/*  */}
        <SizeGuide current="L" available={['M', '2XL', 'L']} />
        {/*  */}
        <div className={styles.buttonsWrapper}>
          <div className={styles.amauntBox}>
            <Amaunt amount={amount} onChange={handleControllerChange} />
          </div>
          <Button
            fullWidth
            color="secondary"
            onClick={handleAddToCart}
            className={styles.orderButton}
            disabled={!inStock}
            startIcon={
              <SvgIcon className={styles.orderButtonIcon}>
                <HeaderCartIcon />
              </SvgIcon>
            }
          >
            {inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </Button>
        </div>
        <SubControls productId={id} />
        {tags && tags.length > 1 && <Tags tags={tags} />}
        <Delivery />
      </div>
    </section>
  )
}
