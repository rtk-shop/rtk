import Link from 'next/link'
import TrashIcon from '../../../public/icons/trash.svg'
import { SvgIcon } from '../ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'
import { AmountController } from '@/components/ui/amount-controller'
import { formatPrice } from '@/lib/helpers'
import { routeNames, generateProductLink } from '@/lib/navigation'
import { updateItemAmount, removeFromCart } from '@/apollo/cache/cart'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

export type CartItemType = {
  id: string
  slug: string
  title: string
  currentPrice: number
  preview: string
}
interface CartItemProps {
  amount: number
  product: CartItemType
}

export function CartItem({ product, amount }: CartItemProps) {
  const { t } = useTranslation('common')

  const { id, slug, title, preview, currentPrice } = product

  const handleAmountChange = (_: string, n: number): void => {
    updateItemAmount(id, n)
  }

  const handleProductRemove = () => {
    removeFromCart(id)
  }

  return (
    <li className={styles.container}>
      <div className={styles.imageWrapper}>
        <Link href={generateProductLink(routeNames.product, id, slug)}>
          <ImagePlaceholder src={preview} altText={title} />
        </Link>
      </div>
      <div className={styles.info}>
        <Link
          title={title}
          href={generateProductLink(routeNames.product, id, slug)}
          className={styles.title}
        >
          {title}
        </Link>
        <span className={styles.price}>
          {t('price')}:&nbsp;&nbsp;{formatPrice(currentPrice)}&nbsp;$
        </span>
        <p className={styles.amount}>
          {amount}&nbsp;шт:&nbsp;&nbsp;{formatPrice(amount * currentPrice)}&nbsp;$
        </p>
        <div className={styles.controls}>
          <AmountController min={1} max={100} amount={amount} onChange={handleAmountChange} />
          <IconButton
            disableRipple
            onClick={handleProductRemove}
            aria-label={`Удалить "${title}"`}
            className={styles.deleteButton}
          >
            <SvgIcon className={styles.trashIcon}>
              <TrashIcon />
            </SvgIcon>
          </IconButton>
        </div>
      </div>
    </li>
  )
}
