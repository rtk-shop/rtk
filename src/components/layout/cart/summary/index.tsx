import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { formatPrice } from '@/utils/helpers'
import { useCartStore } from '@/store/cart'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

interface SummaryProps {
  isLoading: boolean
  onCheckout(): void
}

export function Summary({ isLoading, onCheckout }: SummaryProps) {
  const cartPrice = useCartStore((state) => state.cartPrice)
  const { t } = useTranslation('common')

  const handleButtonClick = (): void => {
    onCheckout()
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.cartPrice}>
          <span>{t('cart.total')}:</span>
          <b>{formatPrice(cartPrice)}&nbsp;грн.</b>
        </p>
        <Button color="accept" fullWidth onClick={handleButtonClick}>
          {t('cart.makeOrder')}
        </Button>
      </div>
    </div>
  )
}
