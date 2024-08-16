import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { formatPrice } from '@/lib/helpers'
import { useCartPrice } from '@/apollo/cache/cart'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

interface SummaryProps {
  currency: number
  loading: boolean
  onCheckout(): void
}

export function Summary({ loading, currency, onCheckout }: SummaryProps) {
  const { t } = useTranslation('common')
  const cartPrice = useCartPrice()

  const handleButtonClick = (): void => {
    onCheckout()
  }

  if (loading) return <Skeleton />

  return (
    <div className={styles.container}>
      <p className={styles.cartPrice}>
        <b>{t('cart.total')}:</b>
        <span>
          <span>{formatPrice(cartPrice)}$&nbsp;</span>
          <span className={styles.uahPrice}>• {formatPrice(cartPrice * currency)}грн</span>
        </span>
      </p>
      <Button color="accept" fullWidth onClick={handleButtonClick}>
        {t('cart.makeOrder')}
      </Button>
    </div>
  )
}
