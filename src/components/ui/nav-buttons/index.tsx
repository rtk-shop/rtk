import clsx from 'clsx'
import { SvgIcon } from '../svg-icon'
import { IconButton } from '@/components/ui/icon-button'
import ArrowIcon from '../../../../public/assets/icons/expand-arrow.svg'

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
        <SvgIcon className={styles.prevButtonIcon}>
          <ArrowIcon />
        </SvgIcon>
      </IconButton>
      <IconButton
        onClick={onNext}
        disableRipple
        className={clsx(styles.navigationButton, styles.nextButton)}
      >
        <SvgIcon className={styles.nextButtonIcon}>
          <ArrowIcon />
        </SvgIcon>
      </IconButton>
    </>
  )
}
