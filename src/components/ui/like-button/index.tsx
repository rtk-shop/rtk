import { MouseEvent } from 'react'
import { IconButton } from '@/components/ui/icon-button'

import styles from './styles.module.css'

export interface LikeButtonProps {
  liked: boolean
  width?: number
  height?: number
  className?: string
  onClick: (e: MouseEvent) => void
}

export function LikeButton({ liked, width = 20, height = 20, ...restProps }: LikeButtonProps) {
  return (
    <IconButton className={styles.button} {...restProps}>
      <svg
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={styles.svgEL + ' ' + (liked ? styles.liked : '')}
      >
        <path
          id="heart"
          d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
        />
      </svg>
    </IconButton>
  )
}
