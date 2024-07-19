import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import { useCartStore } from '@/store/cart'
import useTranslation from 'next-translate/useTranslation'
import CrossIcon from '../../../../../public/icons/cross.svg'
import TrashIcon from '../../../../../public/icons/trash.svg'

import styles from './styles.module.scss'

interface CartHeadProps {
  onCartClose(): void
}

export function CartHead({ onCartClose }: CartHeadProps) {
  const { t } = useTranslation('common')

  const clearCart = useCartStore((state) => state.clear)

  const handleClearClick = (): void => {
    clearCart()
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <IconButton disableRipple onClick={onCartClose} className={styles.closeButton}>
          <SvgIcon className={styles.closeIcon}>
            <CrossIcon />
          </SvgIcon>
        </IconButton>
        <p className={styles.title}>
          <b>{t('cart.topControls.title1')}</b>&nbsp;{t('cart.topControls.title2')}
        </p>
        <Button
          color="secondary"
          onClick={handleClearClick}
          className={styles.clearButton}
          startIcon={
            <SvgIcon className={styles.trashIcon}>
              <TrashIcon />
            </SvgIcon>
          }
        >
          {t('cart.topControls.action')}
        </Button>
      </div>
    </div>
  )
}
