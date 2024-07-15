import { Button } from '@/components/ui/button'
import { Skeleton } from './skeleton'
import { formatPrice } from '@/utils/helpers'
import { useCartStore } from '@/store/cart'
import useTranslation from 'next-translate/useTranslation'

import styles from './styles.module.scss'

interface SummaryProps {
  loading: boolean
  onCheckout(): void
}

export function Summary({ loading, onCheckout }: SummaryProps) {
  const cartPrice = useCartStore((state) => state.cartPrice)
  const { t } = useTranslation('common')

  const handleButtonClick = (): void => {
    onCheckout()
  }

  if (loading) return <Skeleton />

  return (
    <div className={styles.container}>
      <p className={styles.cartPrice}>
        <span>{t('cart.total')}:</span>
        <b>{formatPrice(cartPrice)}&nbsp;грн.</b>
      </p>
      <Button color="accept" fullWidth onClick={handleButtonClick}>
        {t('cart.makeOrder')}
      </Button>
    </div>
  )
}
