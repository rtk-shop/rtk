import { Button } from '@/components/ui/button'
import { SvgIcon } from '@/components/ui/svg-icon'
import EmptyCartIcon from '../../../../../public/assets/emptycart.svg'
import ArrowIcon from '../../../../../public/icons/expand-arrow.svg'

import styles from './index.module.scss'

interface ProcessPlugProps {
  text: string
  onClose(): void
}

export function ProcessPlug({ text, onClose }: ProcessPlugProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <EmptyCartIcon />
        <p>{text}</p>
      </div>
      <Button
        fullWidth
        onClick={onClose}
        color="secondary"
        className={styles.backButton}
        startIcon={
          <SvgIcon className={styles.icon}>
            <ArrowIcon />
          </SvgIcon>
        }
      >
        Назад
      </Button>
    </div>
  )
}
