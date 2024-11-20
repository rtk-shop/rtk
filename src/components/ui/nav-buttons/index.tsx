import clsx from 'clsx'
import { Icon } from '../icon'
import { IconButton } from '@/components/ui/icon-button'

import styles from './styles.module.scss'

interface NavButtonsProps {
  onPrev(): void
  onNext(): void
}

export function NavButtons({ onPrev, onNext }: NavButtonsProps) {
  return (
    <>
      <IconButton
        onClick={onPrev}
        disableRipple
        className={clsx(styles.navigationButton, styles.prevButton)}
      >
        <Icon name="common/arrow" className={styles.prevButtonIcon} />
      </IconButton>
      <IconButton
        onClick={onNext}
        disableRipple
        className={clsx(styles.navigationButton, styles.nextButton)}
      >
        <Icon name="common/arrow" className={styles.nextButtonIcon} />
      </IconButton>
    </>
  )
}
